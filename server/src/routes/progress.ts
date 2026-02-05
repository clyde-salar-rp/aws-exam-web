import { Router, Response } from "express";
import logger, { sanitizeError } from "../lib/logger.js";
import { AuthRequest } from "../auth/middleware.js";
import { getProgressSummary, getTopicProgress } from "../services/progressService.js";

const router = Router();

// GET /api/progress - Get overall progress summary for authenticated user
router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const progress = await getProgressSummary(userId);
    res.json(progress);
  } catch (error) {
    logger.error(sanitizeError(error), "Error getting progress");
    res.status(500).json({ error: "Failed to get progress" });
  }
});

// GET /api/progress/topics - Get per-topic stats for authenticated user
router.get("/topics", async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const topics = await getTopicProgress(userId);
    res.json(topics);
  } catch (error) {
    logger.error(sanitizeError(error), "Error getting topic progress");
    res.status(500).json({ error: "Failed to get topic progress" });
  }
});

export default router;
