import { Router } from "express";
import logger, { sanitizeError } from "../lib/logger.js";
import { AuthRequest } from "../auth/middleware.js";
import {
  getAllQuestions,
  getQuestionById,
  selectQuestions,
  type SelectionMode,
} from "../services/questionService.js";

const router = Router();

// GET /api/questions - Get questions with optional filters
router.get("/", async (req: AuthRequest, res) => {
  try {
    const mode = (req.query.mode as SelectionMode) || "adaptive";
    const count = parseInt(req.query.count as string) || 20;
    const subtopic = req.query.subtopic as string | undefined;
    const userId = req.user?.userId; // Get userId from authenticated user (optional)

    const questions = await selectQuestions(count, mode, subtopic, userId);
    res.json(questions);
  } catch (error) {
    logger.error(sanitizeError(error), "Error getting questions");
    res.status(500).json({ error: "Failed to get questions" });
  }
});

// GET /api/questions/all - Get all questions (for debugging/admin)
router.get("/all", (req, res) => {
  try {
    const questions = getAllQuestions();
    res.json(questions);
  } catch (error) {
    logger.error(sanitizeError(error), "Error getting all questions");
    res.status(500).json({ error: "Failed to get questions" });
  }
});

// GET /api/questions/:id - Get a single question
router.get("/:id", (req, res) => {
  try {
    const question = getQuestionById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(question);
  } catch (error) {
    logger.error(sanitizeError(error), "Error getting question");
    res.status(500).json({ error: "Failed to get question" });
  }
});

export default router;
