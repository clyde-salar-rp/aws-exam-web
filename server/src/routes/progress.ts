import { Router } from "express";
import { getProgressSummary, getTopicProgress } from "../services/progressService.js";

const router = Router();

// GET /api/progress - Get overall progress summary
router.get("/", async (req, res) => {
  try {
    const progress = await getProgressSummary();
    res.json(progress);
  } catch (error) {
    console.error("Error getting progress:", error);
    res.status(500).json({ error: "Failed to get progress" });
  }
});

// GET /api/progress/topics - Get per-topic stats
router.get("/topics", async (req, res) => {
  try {
    const topics = await getTopicProgress();
    res.json(topics);
  } catch (error) {
    console.error("Error getting topic progress:", error);
    res.status(500).json({ error: "Failed to get topic progress" });
  }
});

export default router;
