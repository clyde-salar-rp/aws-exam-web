import { Router, Response } from "express";
import logger, { sanitizeError } from "../lib/logger.js";
import { AuthRequest } from "../auth/middleware.js";
import {
  createSession,
  getAllSessions,
  getSession,
  getResultsBySession,
  createQuestionResult,
} from "../db/database.js";

const router = Router();

// GET /api/sessions - Get all sessions for authenticated user
router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.userId;
    const sessions = await getAllSessions(userId);
    res.json(sessions);
  } catch (error) {
    logger.error(sanitizeError(error), "Error getting sessions");
    res.status(500).json({ error: "Failed to get sessions" });
  }
});

// GET /api/sessions/:id - Get a single session with results
router.get("/:id", async (req: AuthRequest, res: Response) => {
  try {
    const sessionId = parseInt(req.params.id);
    const userId = req.user!.userId;

    const session = await getSession(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Verify session belongs to user
    if (session.user_id !== userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    const results = await getResultsBySession(sessionId);
    res.json({ session, results });
  } catch (error) {
    logger.error(sanitizeError(error), "Error getting session");
    res.status(500).json({ error: "Failed to get session" });
  }
});

// POST /api/sessions - Create a new session
router.post("/", async (req: AuthRequest, res: Response) => {
  try {
    const { total_questions, correct, percentage, results } = req.body;
    const userId = req.user!.userId;

    // Create the session
    const session = await createSession({
      total_questions,
      correct,
      percentage,
      user_id: userId,
    });

    // Save question results
    if (results && Array.isArray(results)) {
      for (const result of results) {
        await createQuestionResult({
          session_id: session.id,
          question_id: result.question_id,
          question_text: result.question_text,
          user_answer: result.user_answer,
          correct_answer: result.correct_answer,
          is_correct: result.is_correct,
          subtopic: result.subtopic,
        });
      }
    }

    res.status(201).json(session);
  } catch (error) {
    logger.error(sanitizeError(error), "Error creating session");
    res.status(500).json({ error: "Failed to create session" });
  }
});

export default router;
