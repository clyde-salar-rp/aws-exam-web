import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
