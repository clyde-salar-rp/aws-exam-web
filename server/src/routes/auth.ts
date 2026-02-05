import express, { Request, Response } from 'express';
import passport from '../auth/passport';
import { generateToken } from '../auth/jwt';
import { AuthRequest, requireAuth } from '../auth/middleware';
import { createLocalUser, getUserByEmail, getUserById, updateUserPassword, incrementFailedLoginAttempts, resetFailedLoginAttempts, lockAccount, isAccountLocked } from '../db/database';
import { hashPassword, comparePassword, validatePassword, validateEmail } from '../auth/password';
import logger, { sanitizeError } from '../lib/logger';
import { authLimiter, passwordChangeLimiter } from '../middleware/rateLimiter';
import { validateRegistration, validateLogin, validatePasswordChange } from '../middleware/validation';

const router = express.Router();

// Determine if we're in production
const isProduction = process.env.NODE_ENV === 'production';

// Frontend URL for redirects
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

/**
 * Initiate Google OAuth flow
 * GET /api/auth/google
 */
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email'],
  session: false, // We're using JWT, not sessions
}));

/**
 * Google OAuth callback
 * GET /api/auth/google/callback
 */
router.get('/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${FRONTEND_URL}/login?error=auth_failed`
  }),
  async (req: AuthRequest, res: Response) => {
    try {
      // User should be attached by passport
      const user = req.user as any;

      if (!user || !user.id) {
        return res.redirect(`${FRONTEND_URL}/login?error=no_user`);
      }

      // Fetch full user data to get token version
      const fullUser = await getUserById(user.id);
      if (!fullUser) {
        return res.redirect(`${FRONTEND_URL}/login?error=user_not_found`);
      }

      // Generate JWT token with token version
      const token = generateToken({
        userId: fullUser.id,
        email: fullUser.email,
        name: fullUser.name,
        picture: fullUser.picture || '',
        tokenVersion: fullUser.token_version,
      });

      // Set HTTP-only cookie with JWT
      res.cookie('auth_token', token, {
        httpOnly: true, // Prevents XSS attacks
        secure: isProduction, // HTTPS only in production
        sameSite: 'strict', // Prevents CSRF attacks
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        path: '/',
      });

      // Redirect to dashboard
      res.redirect(`${FRONTEND_URL}/dashboard`);
    } catch (error) {
      console.error('OAuth callback error:', error);
      res.redirect(`${FRONTEND_URL}/login?error=server_error`);
    }
  }
);

/**
 * Register a new local user
 * POST /api/auth/register
 */
router.post('/register', authLimiter, validateRegistration, async (req: Request, res: Response) => {
  try {
    const { email, name, password } = req.body;

    // Validate input
    if (!email || !name || !password) {
      return res.status(400).json({ error: 'Email, name, and password are required' });
    }

    // Validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate password strength
    const passwordError = validatePassword(password);
    if (passwordError) {
      return res.status(400).json({ error: passwordError });
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await createLocalUser({
      email,
      name,
      password: hashedPassword,
    });

    // Generate JWT token with token version
    const token = generateToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture || '',
      tokenVersion: user.token_version,
    });

    // Set HTTP-only cookie with JWT
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    logger.info({ userId: user.id, email: user.email }, 'User registered successfully');

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    logger.error(sanitizeError(error), 'Registration error');
    res.status(500).json({ error: 'Registration failed' });
  }
});

/**
 * Login with email and password
 * POST /api/auth/login
 */
router.post('/login', authLimiter, validateLogin, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = await getUserByEmail(email);
    if (!user) {
      // Use generic error message to prevent user enumeration
      await new Promise(resolve => setTimeout(resolve, 100)); // Constant-time delay
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Check if account is locked
    if (isAccountLocked(user)) {
      const lockExpiry = new Date(user.locked_until!);
      const minutesRemaining = Math.ceil((lockExpiry.getTime() - Date.now()) / 60000);
      return res.status(423).json({
        error: `Account temporarily locked due to multiple failed login attempts. Please try again in ${minutesRemaining} minute(s).`
      });
    }

    // Check if user uses local authentication
    if (user.auth_provider !== 'local' || !user.password) {
      return res.status(401).json({ error: 'This account uses OAuth. Please sign in with Google.' });
    }

    // Verify password
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      // Increment failed login attempts
      const attempts = await incrementFailedLoginAttempts(user.id);

      // Lock account after 5 failed attempts
      if (attempts >= 5) {
        await lockAccount(user.id, 30); // Lock for 30 minutes
        logger.warn({ userId: user.id, email: user.email, attempts }, 'Account locked due to failed login attempts');
        return res.status(423).json({
          error: 'Too many failed login attempts. Account locked for 30 minutes.'
        });
      }

      logger.warn({ userId: user.id, email: user.email, attempts }, 'Failed login attempt');
      return res.status(401).json({
        error: `Invalid email or password. ${5 - attempts} attempt(s) remaining before account lockout.`
      });
    }

    // Reset failed login attempts on successful login
    await resetFailedLoginAttempts(user.id);

    // Generate JWT token with token version
    const token = generateToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      picture: user.picture || '',
      tokenVersion: user.token_version,
    });

    // Set HTTP-only cookie with JWT
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    logger.info({ userId: user.id, email: user.email }, 'User logged in successfully');

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    logger.error(sanitizeError(error), 'Login error');
    res.status(500).json({ error: 'Login failed' });
  }
});

/**
 * Get current authenticated user
 * GET /api/auth/me
 */
router.get('/me', requireAuth, async (req: AuthRequest, res: Response) => {
  try {
    // Fetch full user data from database to get must_change_password flag
    const user = await getUserById(req.user!.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return user data without password
    const { password, ...userWithoutPassword } = user;

    res.json({
      user: userWithoutPassword
    });
  } catch (error) {
    logger.error(sanitizeError(error), 'Error fetching user');
    res.status(500).json({ error: 'Failed to fetch user data' });
  }
});

/**
 * Change password for authenticated user
 * POST /api/auth/change-password
 */
router.post('/change-password', requireAuth, passwordChangeLimiter, validatePasswordChange, async (req: AuthRequest, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user!.userId;

    // Validate input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current password and new password are required' });
    }

    // Get user from database
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user uses local authentication
    if (user.auth_provider !== 'local' || !user.password) {
      return res.status(400).json({ error: 'Password change not available for OAuth users' });
    }

    // Verify current password
    const isCurrentPasswordValid = await comparePassword(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    // Validate new password strength
    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      return res.status(400).json({ error: passwordError });
    }

    // Check if new password is different from current
    if (currentPassword === newPassword) {
      return res.status(400).json({ error: 'New password must be different from current password' });
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password and clear must_change_password flag
    await updateUserPassword(userId, hashedPassword, false);

    logger.info({ userId, email: user.email }, 'Password changed successfully');

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    logger.error(sanitizeError(error), 'Password change error');
    res.status(500).json({ error: 'Password change failed' });
  }
});

/**
 * Logout user (clear auth cookie)
 * POST /api/auth/logout
 */
router.post('/logout', (req: AuthRequest, res: Response) => {
  // Clear the auth cookie
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    path: '/',
  });

  res.json({ success: true, message: 'Logged out successfully' });
});

export default router;
