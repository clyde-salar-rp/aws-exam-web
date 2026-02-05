/**
 * Application configuration
 * Gets API URL from environment variables with sensible defaults
 */

const getApiUrl = (): string => {
  // Use environment variable if explicitly set
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }

  // In production, use same origin (assumes API and frontend on same domain)
  if (import.meta.env.MODE === 'production') {
    return window.location.origin;
  }

  // Development default
  return 'http://localhost:3001';
};

export const config = {
  apiUrl: getApiUrl(),
} as const;
