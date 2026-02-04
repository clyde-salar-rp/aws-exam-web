import pinoHttp from "pino-http";
import type { IncomingMessage, ServerResponse } from "http";
import logger from "../lib/logger.js";

// Headers that should never be logged
const REDACTED_HEADERS = [
  "authorization",
  "cookie",
  "set-cookie",
  "x-api-key",
  "x-auth-token",
  "x-access-token",
];

// Sanitize headers by redacting sensitive values
function sanitizeHeaders(headers: Record<string, unknown>): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(headers)) {
    if (REDACTED_HEADERS.includes(key.toLowerCase())) {
      sanitized[key] = "[REDACTED]";
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

export const requestLogger = (pinoHttp as unknown as typeof pinoHttp.default)({
  logger,
  autoLogging: {
    ignore: (req: IncomingMessage) => req.url === "/api/health",
  },
  customSuccessMessage: (req: IncomingMessage, res: ServerResponse) => {
    return `${req.method} ${req.url} completed`;
  },
  customErrorMessage: (req: IncomingMessage, res: ServerResponse, err: Error) => {
    return `${req.method} ${req.url} failed`;
  },
  customAttributeKeys: {
    responseTime: "duration",
  },
  serializers: {
    req: (req) => ({
      id: req.id,
      method: req.method,
      url: req.url,
      // Redact sensitive headers
      headers: sanitizeHeaders(req.headers || {}),
      // Omit remoteAddress for privacy
    }),
    res: (res) => ({
      statusCode: res.statusCode,
      // Omit response headers to reduce log size
    }),
  },
});
