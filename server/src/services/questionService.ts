import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import logger from "../lib/logger.js";
import {
  getTopicStats,
  getResultsByQuestionId,
  getMissedQuestionIds,
  getAnsweredQuestionIds,
} from "../db/database.js";
import { SUBTOPICS } from "../data/topics.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export interface AnswerOption {
  letter: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  options: AnswerOption[];
  correct_answers: string[];
  question_type: "single" | "multi";
  explanation: string | null;
  source_file: string;
  question_number: number;
  subtopic: string;
}

let questionsCache: Question[] | null = null;

export function loadQuestions(): Question[] {
  if (questionsCache) return questionsCache;

  const questionsPath = path.join(__dirname, "..", "data", "questions.json");
  const data = JSON.parse(fs.readFileSync(questionsPath, "utf-8"));
  questionsCache = data.questions as Question[];
  logger.debug({ count: questionsCache.length }, "Questions loaded");
  return questionsCache;
}

export function getAllQuestions(): Question[] {
  return loadQuestions();
}

export function getQuestionById(id: string): Question | undefined {
  return loadQuestions().find((q) => q.id === id);
}

export function getQuestionsBySubtopic(subtopic: string): Question[] {
  return loadQuestions().filter((q) => q.subtopic === subtopic);
}

// Adaptive selection algorithm ported from Python
async function getTopicAccuracy(subtopic: string, userId?: string): Promise<number> {
  const stats = await getTopicStats(userId);
  const topicStat = stats[subtopic];
  if (!topicStat || topicStat.total === 0) return 0.5; // Default for unanswered
  return topicStat.correct / topicStat.total;
}

async function getTopicWeights(userId?: string): Promise<Record<string, number>> {
  const stats = await getTopicStats(userId);
  const weights: Record<string, number> = {};

  for (const subtopic of Object.keys(SUBTOPICS)) {
    const topicStat = stats[subtopic];
    const accuracy = topicStat && topicStat.total > 0
      ? topicStat.correct / topicStat.total
      : 0.5; // Default for unanswered

    // Lower accuracy = higher weight (more likely to be selected)
    // Range: 0.3 (for 100% accuracy) to 1.3 (for 0% accuracy)
    weights[subtopic] = 1 - accuracy + 0.3;
  }

  logger.debug({ weights }, "Topic weights calculated");
  return weights;
}

async function getQuestionWeight(
  question: Question,
  topicWeights: Record<string, number>,
  userId?: string,
  hasHistory?: boolean
): Promise<number> {
  let baseWeight = topicWeights[question.subtopic] || 1.0;

  // Check question-specific history (only if userId provided and user has history)
  if (userId && hasHistory) {
    const history = await getResultsByQuestionId(question.id, userId);
    if (history.length > 0) {
      // Look at last 3 attempts
      const recent = history.slice(0, 3);
      const correctCount = recent.filter((r) => r.is_correct).length;
      if (correctCount === 0) {
        baseWeight *= 1.5; // Boost for consistently missed
      } else if (correctCount === recent.length) {
        baseWeight *= 0.7; // Reduce for consistently correct
      }
    }
  }

  return baseWeight;
}

async function weightedRandomSelection(
  candidates: Question[],
  count: number,
  userId?: string
): Promise<Question[]> {
  if (candidates.length === 0) return [];

  logger.debug({ candidateCount: candidates.length, requestedCount: count }, "Starting weighted selection");

  // Get topic weights once (optimization)
  const topicWeights = await getTopicWeights(userId);

  // Check if user has any history (optimization for new users)
  const hasHistory = userId ? (await getAnsweredQuestionIds(userId)).length > 0 : false;

  // Calculate weights for all candidates
  const weights = await Promise.all(
    candidates.map(async (q) => ({
      question: q,
      weight: await getQuestionWeight(q, topicWeights, userId, hasHistory),
    }))
  );

  const selected: Question[] = [];
  const remaining = [...weights];

  for (let i = 0; i < Math.min(count, remaining.length); i++) {
    if (remaining.length === 0) break;

    const totalWeight = remaining.reduce((sum, item) => sum + item.weight, 0);
    const r = Math.random() * totalWeight;
    let cumulative = 0;

    for (let j = 0; j < remaining.length; j++) {
      cumulative += remaining[j].weight;
      if (r <= cumulative) {
        selected.push(remaining[j].question);
        remaining.splice(j, 1);
        break;
      }
    }
  }

  logger.debug({ selectedCount: selected.length }, "Weighted selection complete");
  return selected;
}

export type SelectionMode = "adaptive" | "random" | "weak" | "missed" | "new";

export async function selectQuestions(
  count: number,
  mode: SelectionMode = "adaptive",
  subtopic?: string,
  userId?: string
): Promise<Question[]> {
  logger.debug({ count, mode, subtopic, userId }, "Selecting questions");

  // Handle invalid count
  if (count <= 0) {
    return [];
  }

  let candidates = loadQuestions();

  // Apply subtopic filter if specified
  if (subtopic) {
    candidates = candidates.filter((q) => q.subtopic === subtopic);
  }

  switch (mode) {
    case "random":
      // Simple random shuffle
      const shuffled = [...candidates].sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);

    case "weak": {
      // Focus on weak topics (below 70% accuracy)
      const stats = await getTopicStats(userId);
      const weakTopics = Object.entries(stats)
        .filter(([_, stat]) => stat.total > 0 && stat.correct / stat.total < 0.7)
        .map(([topic]) => topic);

      logger.debug({ weakTopics }, "Weak topics identified");
      if (weakTopics.length > 0) {
        candidates = candidates.filter((q) => weakTopics.includes(q.subtopic));
      }

      // Fallback to random if no weak topics found
      if (candidates.length === 0) {
        logger.info("No weak topics found, falling back to random selection");
        candidates = loadQuestions();
        if (subtopic) {
          candidates = candidates.filter((q) => q.subtopic === subtopic);
        }
        const shuffledFallback = [...candidates].sort(() => Math.random() - 0.5);
        return shuffledFallback.slice(0, count);
      }

      return weightedRandomSelection(candidates, count, userId);
    }

    case "missed": {
      // Previously missed questions
      const missedIds = new Set(await getMissedQuestionIds(userId));
      logger.debug({ missedCount: missedIds.size }, "Missed questions found");
      if (missedIds.size > 0) {
        candidates = candidates.filter((q) => missedIds.has(q.id));
      }

      // Fallback to random if no missed questions found
      if (candidates.length === 0) {
        logger.info("No missed questions found, falling back to random selection");
        candidates = loadQuestions();
        if (subtopic) {
          candidates = candidates.filter((q) => q.subtopic === subtopic);
        }
        const shuffledFallback = [...candidates].sort(() => Math.random() - 0.5);
        return shuffledFallback.slice(0, count);
      }

      return weightedRandomSelection(candidates, count, userId);
    }

    case "new": {
      // Questions not yet answered
      const answeredIds = new Set(await getAnsweredQuestionIds(userId));
      candidates = candidates.filter((q) => !answeredIds.has(q.id));
      logger.debug({ newCount: candidates.length }, "New questions available");

      // Fallback to random if all questions have been answered
      if (candidates.length === 0) {
        logger.info("All questions answered, falling back to random selection");
        candidates = loadQuestions();
        if (subtopic) {
          candidates = candidates.filter((q) => q.subtopic === subtopic);
        }
      }

      // Random selection for new questions
      const shuffledNew = [...candidates].sort(() => Math.random() - 0.5);
      return shuffledNew.slice(0, count);
    }

    case "adaptive":
    default: {
      // For new users without history, use random selection (optimization)
      if (userId) {
        const hasHistory = (await getAnsweredQuestionIds(userId)).length > 0;
        if (!hasHistory) {
          logger.info("New user detected, using random selection for adaptive mode");
          const shuffledAdaptive = [...candidates].sort(() => Math.random() - 0.5);
          return shuffledAdaptive.slice(0, count);
        }
      }
      return weightedRandomSelection(candidates, count, userId);
    }
  }
}
