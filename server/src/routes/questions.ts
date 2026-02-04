import { Router } from "express";
import logger from "../lib/logger.js";
import {
  getAllQuestions,
  getQuestionById,
  selectQuestions,
  type SelectionMode,
} from "../services/questionService.js";

const router = Router();

// GET /api/questions - Get questions with optional filters
router.get("/", async (req, res) => {
  try {
    const mode = (req.query.mode as SelectionMode) || "adaptive";
    const count = parseInt(req.query.count as string) || 20;
    const subtopic = req.query.subtopic as string | undefined;

    const questions = await selectQuestions(count, mode, subtopic);
    res.json(questions);
  } catch (error) {
    logger.error({ err: error, query: req.query }, "Error getting questions");
    res.status(500).json({ error: "Failed to get questions" });
  }
});

// GET /api/questions/all - Get all questions (for debugging/admin)
router.get("/all", (req, res) => {
  try {
    const questions = getAllQuestions();
    res.json(questions);
  } catch (error) {
    logger.error({ err: error }, "Error getting all questions");
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
    logger.error({ err: error, questionId: req.params.id }, "Error getting question");
    res.status(500).json({ error: "Failed to get question" });
  }
});

export default router;
