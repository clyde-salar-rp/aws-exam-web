import 'dotenv/config';

import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import logger, { sanitizeError } from "./lib/logger.js";
import { requestLogger } from "./middleware/requestLogger.js";
import passport from "./auth/passport.js";
import { requireAuth } from "./auth/middleware.js";
import authRouter from "./routes/auth.js";
import questionsRouter from "./routes/questions.js";
import sectionsRouter from "./routes/sections.js";
import sessionsRouter from "./routes/sessions.js";
import progressRouter from "./routes/progress.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

// Build list of allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3001',
  process.env.FRONTEND_URL,
  process.env.PRODUCTION_URL,
].filter(Boolean); // Remove undefined/null values

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles for Tailwind
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false, // Allow loading external resources
  hsts: isProduction ? {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  } : false,
}));

// HTTPS redirect in production
if (isProduction) {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(301, `https://${req.header('host')}${req.url}`);
    } else {
      next();
    }
  });
}

// CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, server-to-server)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      logger.warn({ origin }, 'CORS blocked origin');
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['X-Request-ID'],
  maxAge: 86400, // 24 hours - cache preflight requests
}));

app.use(express.json({ limit: '10kb' })); // Limit request body size
app.use(cookieParser());
app.use(passport.initialize());
app.use(requestLogger);

// API routes
app.use("/api/auth", authRouter);
app.use("/api/questions", questionsRouter); // Public - browse questions
app.use("/api/sections", sectionsRouter); // Public - browse study materials
app.use("/api/sessions", requireAuth, sessionsRouter); // Protected - user-specific
app.use("/api/progress", requireAuth, progressRouter); // Protected - user-specific

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

// Only start server if not in serverless environment (Vercel)
const isServerless = process.env.VERCEL === '1' || process.env.AWS_LAMBDA_FUNCTION_NAME;

if (!isServerless) {
  // Uncaught exception handlers
  process.on("uncaughtException", (err) => {
    logger.fatal(sanitizeError(err), "Uncaught exception");
    process.exit(1);
  });

  process.on("unhandledRejection", (reason) => {
    logger.fatal(sanitizeError(reason), "Unhandled rejection");
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
} else {
  logger.info("Running in serverless mode");
}

export default app;
