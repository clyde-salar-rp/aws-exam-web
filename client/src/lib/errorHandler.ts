/**
 * Error handler utilities for user-friendly and secure error messages
 * Prevents exposing technical details or security vulnerabilities
 */

export type ErrorType =
  | 'network'
  | 'auth'
  | 'validation'
  | 'rate_limit'
  | 'server'
  | 'unknown';

export interface FriendlyError {
  message: string;
  type: ErrorType;
  canRetry: boolean;
}

/**
 * Convert any error into a user-friendly message
 * Security-conscious: Does not expose stack traces, internal errors, or technical details
 */
export function getFriendlyErrorMessage(error: unknown): FriendlyError {
  // Network/connection errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return {
      message: 'Unable to connect to the server. Please check your internet connection and try again.',
      type: 'network',
      canRetry: true,
    };
  }

  // Handle Error objects
  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    // Rate limiting errors (these are actionable for users)
    if (message.includes('too many')) {
      return {
        message: error.message, // Keep the original rate limit message
        type: 'rate_limit',
        canRetry: false,
      };
    }

    // Authentication/authorization errors
    if (
      message.includes('unauthorized') ||
      message.includes('invalid') ||
      message.includes('authentication') ||
      message.includes('credentials')
    ) {
      return {
        message: 'Login failed. Please check your email and password.',
        type: 'auth',
        canRetry: true,
      };
    }

    // Account locked errors
    if (message.includes('locked') || message.includes('temporarily')) {
      return {
        message: error.message, // Keep the original lockout message
        type: 'auth',
        canRetry: false,
      };
    }

    // Validation errors (safe to show)
    if (
      message.includes('validation') ||
      message.includes('required') ||
      message.includes('must') ||
      message.includes('invalid')
    ) {
      return {
        message: error.message,
        type: 'validation',
        canRetry: true,
      };
    }

    // Password-related errors (specific but safe)
    if (message.includes('password')) {
      // Keep password validation messages as they're helpful
      if (
        message.includes('must be') ||
        message.includes('at least') ||
        message.includes('contain')
      ) {
        return {
          message: error.message,
          type: 'validation',
          canRetry: true,
        };
      }
      return {
        message: 'Password change failed. Please check your current password and try again.',
        type: 'auth',
        canRetry: true,
      };
    }

    // OAuth-related errors
    if (message.includes('oauth') || message.includes('google')) {
      return {
        message: 'Sign in with Google failed. Please try again or use email and password.',
        type: 'auth',
        canRetry: true,
      };
    }

    // Server errors (generic response)
    if (message.includes('500') || message.includes('server')) {
      return {
        message: 'A server error occurred. Please try again in a moment.',
        type: 'server',
        canRetry: true,
      };
    }

    // Registration errors
    if (message.includes('already exists') || message.includes('duplicate')) {
      return {
        message: 'An account with this email already exists. Please try logging in instead.',
        type: 'validation',
        canRetry: false,
      };
    }
  }

  // Fallback for unknown errors (most secure - don't expose anything)
  return {
    message: 'Something went wrong. Please try again.',
    type: 'unknown',
    canRetry: true,
  };
}

/**
 * Get a friendly error message from an API response
 * Handles both string errors and error objects from the API
 */
export function getApiErrorMessage(response: unknown): string {
  // Type guard to check if response is an object with error or message
  if (typeof response === 'object' && response !== null) {
    const responseObj = response as { error?: string; message?: string };

    // If response has an error field, process it
    if (responseObj.error) {
      const friendlyError = getFriendlyErrorMessage(new Error(responseObj.error));
      return friendlyError.message;
    }

    // If response has a message field
    if (responseObj.message) {
      const friendlyError = getFriendlyErrorMessage(new Error(responseObj.message));
      return friendlyError.message;
    }
  }

  // Fallback
  return 'An unexpected error occurred. Please try again.';
}

/**
 * Special handling for fetch errors
 */
export async function handleFetchError(error: unknown, defaultMessage?: string): Promise<string> {
  // Network errors
  if (error instanceof TypeError && error.message.includes('fetch')) {
    return 'Unable to connect to the server. Please check your internet connection.';
  }

  // Response errors with JSON body
  if (error instanceof Response) {
    try {
      const data = await error.json();
      return getApiErrorMessage(data);
    } catch {
      // If parsing fails, use status-based message
      if (error.status === 401) {
        return 'Your session has expired. Please log in again.';
      }
      if (error.status === 403) {
        return 'You do not have permission to perform this action.';
      }
      if (error.status === 404) {
        return 'The requested resource was not found.';
      }
      if (error.status >= 500) {
        return 'A server error occurred. Please try again later.';
      }
    }
  }

  // Use the provided default or generic message
  const friendlyError = getFriendlyErrorMessage(error);
  return defaultMessage || friendlyError.message;
}

/**
 * Format error for logging (safe for console, not for user display)
 */
export function getErrorForLogging(error: unknown): string {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}`;
  }
  return String(error);
}
