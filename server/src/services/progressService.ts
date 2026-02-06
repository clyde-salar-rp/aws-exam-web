import {
  getAllSessions,
  getAllResults,
  getTopicStats as getDbTopicStats,
} from "../db/database.js";
import { SUBTOPICS, getSubtopicDisplayName } from "../data/topics.js";

export interface TopicStats {
  subtopic: string;
  display_name: string;
  total: number;
  correct: number;
  accuracy: number;
  mastery: "not_started" | "learning" | "needs_work" | "proficient" | "mastered";
}

export interface ProgressSummary {
  total_questions_answered: number;
  total_correct: number;
  overall_accuracy: number;
  sessions_completed: number;
  exam_readiness: number;
  topics: TopicStats[];
}

function calculateMastery(
  total: number,
  accuracy: number
): TopicStats["mastery"] {
  if (total === 0) return "not_started";
  if (accuracy >= 90) return "mastered";
  if (accuracy >= 80) return "proficient";
  if (accuracy >= 70) return "learning";
  return "needs_work";
}

export async function getTopicProgress(userId?: string): Promise<TopicStats[]> {
  const dbStats = await getDbTopicStats(userId);

  return Object.keys(SUBTOPICS).map((subtopic) => {
    const stats = dbStats[subtopic] || { total: 0, correct: 0 };
    const accuracy = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;

    return {
      subtopic,
      display_name: getSubtopicDisplayName(subtopic),
      total: stats.total,
      correct: stats.correct,
      accuracy,
      mastery: calculateMastery(stats.total, accuracy),
    };
  });
}

export async function getProgressSummary(userId?: string): Promise<ProgressSummary> {
  const sessions = await getAllSessions(userId);
  const results = await getAllResults(userId);
  const topics = await getTopicProgress(userId);

  // Count unique questions seen (not total attempts)
  const uniqueQuestions = new Set(results.map((r) => r.question_id));
  const totalAnswered = uniqueQuestions.size;

  const totalCorrect = results.filter((r) => r.is_correct).length;
  const overallAccuracy =
    results.length > 0 ? (totalCorrect / results.length) * 100 : 0;

  // Calculate exam readiness based on:
  // - Topic coverage (how many topics have been studied)
  // - Topic mastery (weighted by importance)
  // - Overall accuracy
  const studiedTopics = topics.filter((t) => t.total > 0);
  const topicCoverage = (studiedTopics.length / topics.length) * 100;

  const avgTopicAccuracy =
    studiedTopics.length > 0
      ? studiedTopics.reduce((sum, t) => sum + t.accuracy, 0) /
        studiedTopics.length
      : 0;

  // Exam readiness formula:
  // 40% topic coverage, 60% average topic accuracy
  const examReadiness = topicCoverage * 0.4 + avgTopicAccuracy * 0.6;

  return {
    total_questions_answered: totalAnswered,
    total_correct: totalCorrect,
    overall_accuracy: overallAccuracy,
    sessions_completed: sessions.length,
    exam_readiness: examReadiness,
    topics,
  };
}
