import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { selectQuestions, type SelectionMode } from './questionService.js';
import * as database from '../db/database.js';

// Mock the database module
vi.mock('../db/database.js', () => ({
  getTopicStats: vi.fn(),
  getResultsByQuestionId: vi.fn(),
  getMissedQuestionIds: vi.fn(),
  getAnsweredQuestionIds: vi.fn(),
}));

// Mock the topics module
vi.mock('../data/topics.js', () => ({
  SUBTOPICS: {
    cloud_computing: 'Cloud Computing',
    iam: 'IAM & Security',
    ec2: 'EC2',
    s3: 'S3',
  },
}));

// Mock logger to avoid logging during tests
vi.mock('../lib/logger.js', () => ({
  default: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  },
  sanitizeError: vi.fn((err) => err),
}));

describe('Question Service - Exam Modes', () => {
  const mockUserId = 'test-user-123';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Random Mode', () => {
    it('should return random questions without database queries', async () => {
      const questions = await selectQuestions(10, 'random');

      expect(questions).toHaveLength(10);
      // Random mode should not call any database functions
      expect(database.getTopicStats).not.toHaveBeenCalled();
      expect(database.getMissedQuestionIds).not.toHaveBeenCalled();
      expect(database.getAnsweredQuestionIds).not.toHaveBeenCalled();
    });

    it('should return requested count of questions', async () => {
      const questions = await selectQuestions(5, 'random');
      expect(questions).toHaveLength(5);
    });

    it('should filter by subtopic when specified', async () => {
      const questions = await selectQuestions(10, 'random', 'cloud_computing');

      expect(questions).toHaveLength(10);
      questions.forEach(q => {
        expect(q.subtopic).toBe('cloud_computing');
      });
    });
  });

  describe('Weak Topics Mode', () => {
    it('should return questions from weak topics (below 70%)', async () => {
      // Mock stats showing weak performance in cloud_computing
      vi.mocked(database.getTopicStats).mockResolvedValue({
        cloud_computing: { total: 10, correct: 5 }, // 50% - weak
        iam: { total: 10, correct: 8 }, // 80% - strong
        ec2: { total: 10, correct: 6 }, // 60% - weak
        s3: { total: 10, correct: 9 }, // 90% - strong
      });

      vi.mocked(database.getAnsweredQuestionIds).mockResolvedValue([]);

      const questions = await selectQuestions(10, 'weak', undefined, mockUserId);

      expect(questions).toHaveLength(10);
      expect(database.getTopicStats).toHaveBeenCalledWith(mockUserId);

      // Should only include questions from weak topics (cloud_computing, ec2)
      questions.forEach(q => {
        expect(['cloud_computing', 'ec2']).toContain(q.subtopic);
      });
    });

    it('should fall back to random when no weak topics found', async () => {
      // Mock stats showing all topics are strong
      vi.mocked(database.getTopicStats).mockResolvedValue({
        cloud_computing: { total: 10, correct: 9 }, // 90%
        iam: { total: 10, correct: 8 }, // 80%
        ec2: { total: 10, correct: 8 }, // 80%
        s3: { total: 10, correct: 9 }, // 90%
      });

      vi.mocked(database.getAnsweredQuestionIds).mockResolvedValue([]);

      const questions = await selectQuestions(10, 'weak', undefined, mockUserId);

      expect(questions).toHaveLength(10);
      // Should fall back to random selection
      expect(database.getTopicStats).toHaveBeenCalledWith(mockUserId);
    });

    it('should fall back to random for new users with no stats', async () => {
      // Mock empty stats for new user
      vi.mocked(database.getTopicStats).mockResolvedValue({});

      const questions = await selectQuestions(10, 'weak', undefined, mockUserId);

      expect(questions).toHaveLength(10);
    });
  });

  describe('Missed Questions Mode', () => {
    it('should return only previously missed questions', async () => {
      // Use actual question IDs that exist in questions.json
      const missedQuestionIds = [
        'e643c549d65a',
        '2b9b248741bc',
        '9d2f7b080889',
        '57913221d1cc',
        '9f80f34f938c'
      ];
      vi.mocked(database.getMissedQuestionIds).mockResolvedValue(missedQuestionIds);
      vi.mocked(database.getTopicStats).mockResolvedValue({
        cloud_computing: { total: 10, correct: 5 },
        iam: { total: 10, correct: 5 },
        ec2: { total: 10, correct: 5 },
        s3: { total: 10, correct: 5 },
      });
      vi.mocked(database.getAnsweredQuestionIds).mockResolvedValue(missedQuestionIds);
      vi.mocked(database.getResultsByQuestionId).mockResolvedValue([]);

      const questions = await selectQuestions(5, 'missed', undefined, mockUserId);

      expect(database.getMissedQuestionIds).toHaveBeenCalledWith(mockUserId);
      expect(questions.length).toBeGreaterThan(0);
      expect(questions.length).toBeLessThanOrEqual(5);

      // All returned questions should be in the missed list
      questions.forEach(q => {
        expect(missedQuestionIds).toContain(q.id);
      });
    });

    it('should fall back to random when no missed questions found', async () => {
      vi.mocked(database.getMissedQuestionIds).mockResolvedValue([]);
      vi.mocked(database.getTopicStats).mockResolvedValue({});
      vi.mocked(database.getAnsweredQuestionIds).mockResolvedValue([]);

      const questions = await selectQuestions(10, 'missed', undefined, mockUserId);

      expect(questions).toHaveLength(10);
      expect(database.getMissedQuestionIds).toHaveBeenCalledWith(mockUserId);
    });

    it('should work for new users with no history', async () => {
      vi.mocked(database.getMissedQuestionIds).mockResolvedValue([]);
      vi.mocked(database.getTopicStats).mockResolvedValue({});
      vi.mocked(database.getAnsweredQuestionIds).mockResolvedValue([]);

      const questions = await selectQuestions(10, 'missed', undefined, mockUserId);

      expect(questions).toHaveLength(10);
    });
  });

  describe('New Questions Mode', () => {
    it('should return only unanswered questions', async () => {
      // Use actual question IDs that exist in questions.json
      const answeredIds = [
        'e643c549d65a',
        '2b9b248741bc',
        '9d2f7b080889'
      ];
      vi.mocked(database.getAnsweredQuestionIds).mockResolvedValue(answeredIds);

      const questions = await selectQuestions(10, 'new', undefined, mockUserId);

      expect(database.getAnsweredQuestionIds).toHaveBeenCalledWith(mockUserId);
      expect(questions).toHaveLength(10);

      // None of the returned questions should be in the answered list
      questions.forEach(q => {
        expect(answeredIds).not.toContain(q.id);
      });
    });

    it('should fall back to random when all questions answered', async () => {
      // Mock that user has answered many questions (use real IDs)
      vi.mocked(database.getAnsweredQuestionIds).mockResolvedValue([
        'e643c549d65a', '2b9b248741bc', '9d2f7b080889', '57913221d1cc',
        '9f80f34f938c', 'aac7fa55e7ca', '6a3986e138eb', '24e8b5a1b394',
        '301ac3d4a53e', '03d1d5f20640',
      ]);

      const questions = await selectQuestions(5, 'new', undefined, mockUserId);

      // Should still return questions (fallback to random)
      expect(questions).toHaveLength(5);
      expect(database.getAnsweredQuestionIds).toHaveBeenCalledWith(mockUserId);
    });

    it('should work for new users with no answered questions', async () => {
      vi.mocked(database.getAnsweredQuestionIds).mockResolvedValue([]);

      const questions = await selectQuestions(10, 'new', undefined, mockUserId);

      expect(questions).toHaveLength(10);
    });
  });

  describe('Adaptive Mode', () => {
    it('should use random selection for new users without history', async () => {
      vi.mocked(database.getAnsweredQuestionIds).mockResolvedValue([]);

      const questions = await selectQuestions(10, 'adaptive', undefined, mockUserId);

      expect(questions).toHaveLength(10);
      expect(database.getAnsweredQuestionIds).toHaveBeenCalledWith(mockUserId);
      // Should not call weighted selection functions for new users
      expect(database.getTopicStats).not.toHaveBeenCalled();
    });

    it('should use weighted selection for users with history', async () => {
      vi.mocked(database.getAnsweredQuestionIds).mockResolvedValue([
        'e643c549d65a',
        '2b9b248741bc',
        '9d2f7b080889'
      ]);
      vi.mocked(database.getTopicStats).mockResolvedValue({
        cloud_computing: { total: 10, correct: 5 },
        iam: { total: 10, correct: 8 },
        ec2: { total: 10, correct: 6 },
        s3: { total: 10, correct: 9 },
      });
      vi.mocked(database.getResultsByQuestionId).mockResolvedValue([]);

      const questions = await selectQuestions(10, 'adaptive', undefined, mockUserId);

      expect(questions).toHaveLength(10);
      expect(database.getAnsweredQuestionIds).toHaveBeenCalledWith(mockUserId);
      expect(database.getTopicStats).toHaveBeenCalledWith(mockUserId);
    });

    it('should work without userId', async () => {
      vi.mocked(database.getTopicStats).mockResolvedValue({});
      vi.mocked(database.getAnsweredQuestionIds).mockResolvedValue([]);

      const questions = await selectQuestions(10, 'adaptive');

      expect(questions).toHaveLength(10);
    });
  });

  describe('Edge Cases', () => {
    it('should handle requesting more questions than available', async () => {
      const questions = await selectQuestions(10000, 'random');

      // Should return all available questions (not more)
      expect(questions.length).toBeLessThanOrEqual(10000);
      expect(questions.length).toBeGreaterThan(0);
    });

    it('should handle subtopic filter with no matching questions', async () => {
      const questions = await selectQuestions(10, 'random', 'nonexistent_topic');

      // Should return empty or handle gracefully
      expect(Array.isArray(questions)).toBe(true);
    });

    it('should handle count of 0', async () => {
      const questions = await selectQuestions(0, 'random');

      expect(questions).toHaveLength(0);
    });

    it('should handle negative count gracefully', async () => {
      const questions = await selectQuestions(-5, 'random');

      expect(Array.isArray(questions)).toBe(true);
      expect(questions.length).toBe(0);
    });
  });

  describe('Performance Optimization', () => {
    it('should cache topic weights in weighted selection', async () => {
      vi.mocked(database.getAnsweredQuestionIds).mockResolvedValue(['q1']);
      vi.mocked(database.getTopicStats).mockResolvedValue({
        cloud_computing: { total: 10, correct: 5 },
      });
      vi.mocked(database.getResultsByQuestionId).mockResolvedValue([]);

      await selectQuestions(5, 'adaptive', undefined, mockUserId);

      // getTopicStats should only be called once (cached)
      expect(database.getTopicStats).toHaveBeenCalledTimes(1);
    });

    it('should skip per-question history checks for users without history', async () => {
      vi.mocked(database.getAnsweredQuestionIds).mockResolvedValue([]);

      await selectQuestions(10, 'adaptive', undefined, mockUserId);

      // Should not call getResultsByQuestionId for new users
      expect(database.getResultsByQuestionId).not.toHaveBeenCalled();
    });
  });

  describe('User Scoping', () => {
    it('should pass userId to database queries when provided', async () => {
      vi.mocked(database.getMissedQuestionIds).mockResolvedValue([]);
      vi.mocked(database.getTopicStats).mockResolvedValue({});
      vi.mocked(database.getAnsweredQuestionIds).mockResolvedValue([]);

      await selectQuestions(10, 'missed', undefined, mockUserId);

      expect(database.getMissedQuestionIds).toHaveBeenCalledWith(mockUserId);
      expect(database.getTopicStats).toHaveBeenCalledWith(mockUserId);
    });

    it('should work without userId (anonymous users)', async () => {
      vi.mocked(database.getTopicStats).mockResolvedValue({});
      vi.mocked(database.getAnsweredQuestionIds).mockResolvedValue([]);

      const questions = await selectQuestions(10, 'weak');

      expect(questions).toHaveLength(10);
      expect(database.getTopicStats).toHaveBeenCalledWith(undefined);
    });
  });
});
