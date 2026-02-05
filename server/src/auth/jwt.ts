import jwt from 'jsonwebtoken';

// Validate JWT_SECRET exists and is strong
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

if (process.env.JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters long for security. Generate with: openssl rand -base64 48');
}

// Warn if not base64 (lower entropy)
if (!/^[A-Za-z0-9+/=]+$/.test(process.env.JWT_SECRET)) {
  console.warn('⚠️  WARNING: JWT_SECRET should be base64 encoded for maximum entropy');
  console.warn('   Generate a strong secret with: openssl rand -base64 48');
}

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = '7d'; // 7 days

export interface JWTPayload {
  userId: string;
  email: string;
  name: string;
  picture: string;
  tokenVersion: number;
}

/**
 * Generate a JWT token with user data
 * @param payload User data to encode in the token
 * @returns Signed JWT token string
 */
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
}

/**
 * Verify and decode a JWT token
 * @param token JWT token string to verify
 * @returns Decoded JWT payload if valid
 * @throws Error if token is invalid or expired
 */
export function verifyToken(token: string): JWTPayload {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token');
    }
    throw error;
  }
}
