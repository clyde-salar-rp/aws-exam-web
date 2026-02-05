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
async function getTopicAccuracy(subtopic: string): Promise<number> {
  const stats = await getTopicStats();
  const topicStat = stats[subtopic];
  if (!topicStat || topicStat.total === 0) return 0.5; // Default for unanswered
  return topicStat.correct / topicStat.total;
}

async function getTopicWeights(): Promise<Record<string, number>> {
  const weights: Record<string, number> = {};
  for (const subtopic of Object.keys(SUBTOPICS)) {
    const accuracy = await getTopicAccuracy(subtopic);
    // Lower accuracy = higher weight (more likely to be selected)
    // Range: 0.3 (for 100% accuracy) to 1.3 (for 0% accuracy)
    weights[subtopic] = 1 - accuracy + 0.3;
  }
  logger.debug({ weights }, "Topic weights calculated");
  return weights;
}

async function getQuestionWeight(question: Question): Promise<number> {
  const topicWeights = await getTopicWeights();
  let baseWeight = topicWeights[question.subtopic] || 1.0;

  // Check question-specific history
  const history = await getResultsByQuestionId(question.id);
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

  return baseWeight;
}

async function weightedRandomSelection(
  candidates: Question[],
  count: number
): Promise<Question[]> {
  if (candidates.length === 0) return [];

  logger.debug({ candidateCount: candidates.length, requestedCount: count }, "Starting weighted selection");

  // Calculate weights for all candidates
  const weights = await Promise.all(
    candidates.map(async (q) => ({
      question: q,
      weight: await getQuestionWeight(q),
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
  subtopic?: string
): Promise<Question[]> {
  logger.debug({ count, mode, subtopic }, "Selecting questions");
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
      const stats = await getTopicStats();
      const weakTopics = Object.entries(stats)
        .filter(([_, stat]) => stat.total > 0 && stat.correct / stat.total < 0.7)
        .map(([topic]) => topic);

      logger.debug({ weakTopics }, "Weak topics identified");
      if (weakTopics.length > 0) {
        candidates = candidates.filter((q) => weakTopics.includes(q.subtopic));
      }
      return weightedRandomSelection(candidates, count);
    }

    case "missed": {
      // Previously missed questions
      const missedIds = new Set(await getMissedQuestionIds());
      logger.debug({ missedCount: missedIds.size }, "Missed questions found");
      if (missedIds.size > 0) {
        candidates = candidates.filter((q) => missedIds.has(q.id));
      }
      return weightedRandomSelection(candidates, count);
    }

    case "new": {
      // Questions not yet answered
      const answeredIds = new Set(await getAnsweredQuestionIds());
      candidates = candidates.filter((q) => !answeredIds.has(q.id));
      logger.debug({ newCount: candidates.length }, "New questions available");
      // Random selection for new questions
      const shuffledNew = [...candidates].sort(() => Math.random() - 0.5);
      return shuffledNew.slice(0, count);
    }

    case "adaptive":
    default:
      return weightedRandomSelection(candidates, count);
  }
}
