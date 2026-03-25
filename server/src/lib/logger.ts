import pino from "pino";

const isDev = process.env.NODE_ENV !== "production" && !process.env.VERCEL;

const logger = pino({
  level: isDev ? "debug" : "info",
  ...(isDev && {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
        translateTime: "HH:MM:ss",
        ignore: "pid,hostname",
      },
    },
  }),
});

// Helper to safely extract error info without exposing internals in production
export function sanitizeError(error: unknown): object {
  if (isDev) {
    return { err: error };
  }

  // In production, only log the message, not stack traces or internal paths
  if (error instanceof Error) {
    return {
      errorMessage: error.message,
      errorName: error.name,
    };
  }

  return { errorMessage: String(error) };
}

export default logger;
