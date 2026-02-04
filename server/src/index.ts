import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import logger from "./lib/logger.js";
import { requestLogger } from "./middleware/requestLogger.js";
import questionsRouter from "./routes/questions.js";
import sectionsRouter from "./routes/sections.js";
import sessionsRouter from "./routes/sessions.js";
import progressRouter from "./routes/progress.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// API routes
app.use("/api/questions", questionsRouter);
app.use("/api/sections", sectionsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/progress", progressRouter);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/dist/index.html"));
  });
}

// Uncaught exception handlers
process.on("uncaughtException", (err) => {
  logger.fatal({ err }, "Uncaught exception");
  process.exit(1);
});

process.on("unhandledRejection", (reason, promise) => {
  logger.fatal({ reason }, "Unhandled rejection");
  process.exit(1);
});

const server = app.listen(PORT, () => {
  logger.info({ port: PORT }, "Server started");
});

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM received, shutting down gracefully");
  server.close(() => {
    logger.info("Server closed");
    process.exit(0);
  });
});

export default app;
