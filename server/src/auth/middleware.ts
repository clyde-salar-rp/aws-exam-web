import { Request, Response, NextFunction } from 'express';
import { verifyToken, JWTPayload } from './jwt.js';
import { getUserById } from '../db/database.js';

// Extend Express Request type to include user
export interface AuthRequest extends Request {
  user?: JWTPayload;
  userRole?: 'user' | 'admin' | 'super_admin';
}

/**
 * Middleware that requires authentication.
 * Returns 401 if no valid token is present.
 * Also verifies token version to invalidate old sessions.
 */
export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
  try {
    // Get token from cookie
    const token = req.cookies?.auth_token;

    if (!token) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    // Verify and decode token
    const payload = verifyToken(token);

    // Verify token version (to invalidate old sessions after password change)
    const user = await getUserById(payload.userId);
    if (!user) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    if (user.token_version !== payload.tokenVersion) {
      res.status(401).json({
        error: 'Session invalidated',
        message: 'Your session has been invalidated. Please log in again.'
      });
      return;
    }

    // Attach user to request
    req.user = payload;

    next();
  } catch (error) {
    res.status(401).json({
      error: 'Invalid or expired token',
      message: error instanceof Error ? error.message : 'Authentication failed'
    });
  }
}

/**
 * Middleware that optionally attaches user if authenticated.
 * Does not block the request if no token is present.
 */
export function optionalAuth(req: AuthRequest, res: Response, next: NextFunction): void {
  try {
    // Get token from cookie
    const token = req.cookies?.auth_token;

    if (token) {
      // Verify and decode token
      const payload = verifyToken(token);

      // Attach user to request
      req.user = payload;
    }

    next();
  } catch (error) {
    // Invalid token - just continue without user
    next();
  }
}

/**
 * Middleware that checks if user has required role.
 * Must be used after requireAuth middleware.
 */
export function requireRole(...roles: Array<'user' | 'admin' | 'super_admin'>) {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Authentication required' });
        return;
      }

      // Fetch user from database to get role
      const user = await getUserById(req.user.userId);

      if (!user) {
        res.status(401).json({ error: 'User not found' });
        return;
      }

      // Attach role to request
      req.userRole = user.role;

      // Check if user has one of the required roles
      if (!roles.includes(user.role)) {
        res.status(403).json({ error: 'Insufficient permissions' });
        return;
      }

      next();
    } catch (error) {
      res.status(500).json({ error: 'Authorization check failed' });
    }
  };
}

/**
 * Shorthand middleware for admin-only routes
 */
export const requireAdmin = requireRole('admin', 'super_admin');

/**
 * Shorthand middleware for super admin-only routes
 */
export const requireSuperAdmin = requireRole('super_admin');
