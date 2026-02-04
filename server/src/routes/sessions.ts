import { Router } from "express";
import logger from "../lib/logger.js";
import {
  createSession,
  getAllSessions,
  getSession,
  getResultsBySession,
  createQuestionResult,
} from "../db/database.js";

const router = Router();

// GET /api/sessions - Get all sessions
router.get("/", async (req, res) => {
  try {
    const sessions = await getAllSessions();
    res.json(sessions);
  } catch (error) {
    logger.error({ err: error }, "Error getting sessions");
    res.status(500).json({ error: "Failed to get sessions" });
  }
});

// GET /api/sessions/:id - Get a single session with results
router.get("/:id", async (req, res) => {
  try {
    const sessionId = parseInt(req.params.id);
    const session = await getSession(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    const results = await getResultsBySession(sessionId);
    res.json({ session, results });
  } catch (error) {
    logger.error({ err: error, sessionId: req.params.id }, "Error getting session");
    res.status(500).json({ error: "Failed to get session" });
  }
});

// POST /api/sessions - Create a new session
router.post("/", async (req, res) => {
  try {
    const { total_questions, correct, percentage, results } = req.body;

    // Create the session
    const session = await createSession({
      total_questions,
      correct,
      percentage,
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
    logger.error({ err: error }, "Error creating session");
    res.status(500).json({ error: "Failed to create session" });
  }
});

export default router;
