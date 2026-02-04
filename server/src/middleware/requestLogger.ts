import pinoHttp from "pino-http";
import type { IncomingMessage, ServerResponse } from "http";
import logger from "../lib/logger.js";

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
});
