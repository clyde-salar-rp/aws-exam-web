import { createClient, Client } from "@libsql/client";
import logger, { sanitizeError } from "../lib/logger.js";

let db: Client | null = null;

async function initDb(): Promise<Client> {
  if (db) return db;

  const dbUrl = process.env.TURSO_DATABASE_URL;
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!dbUrl || !authToken) {
    throw new Error("TURSO_DATABASE_URL and TURSO_AUTH_TOKEN environment variables are required");
  }

  db = createClient({
    url: dbUrl,
    authToken: authToken,
  });

  logger.info("Connected to Turso database");

  // Initialize schema
  await db.execute(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT NOT NULL DEFAULT (datetime('now')),
      total_questions INTEGER NOT NULL,
      correct INTEGER NOT NULL,
      percentage REAL NOT NULL,
      user_id TEXT
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS question_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id INTEGER NOT NULL,
      question_id TEXT NOT NULL,
      question_text TEXT NOT NULL,
      user_answer TEXT NOT NULL,
      correct_answer TEXT NOT NULL,
      is_correct INTEGER NOT NULL,
      subtopic TEXT,
      FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
    )
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      picture TEXT,
      password TEXT,
      role TEXT DEFAULT 'user',
      auth_provider TEXT DEFAULT 'local',
      must_change_password INTEGER DEFAULT 0,
      failed_login_attempts INTEGER DEFAULT 0,
      locked_until TEXT,
      token_version INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      last_login TEXT DEFAULT (datetime('now'))
    )
  `);

  // Create indexes
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_question_results_session ON question_results(session_id)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_question_results_question ON question_results(question_id)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_question_results_subtopic ON question_results(subtopic)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id)`);

  logger.debug("Database schema initialized");
  return db;
}

export async function getDb(): Promise<Client> {
  return initDb();
}

export interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  password?: string;
  role: 'user' | 'admin' | 'super_admin';
  auth_provider: 'local' | 'google';
  must_change_password: boolean;
  failed_login_attempts: number;
  locked_until?: string;
  token_version: number;
  created_at: string;
  last_login: string;
}

export interface Session {
  id: number;
  timestamp: string;
  total_questions: number;
  correct: number;
  percentage: number;
  user_id?: string;
}

export interface QuestionResult {
  id: number;
  session_id: number;
  question_id: string;
  question_text: string;
  user_answer: string;
  correct_answer: string;
  is_correct: number;
  subtopic: string;
}

// Helper function to convert row to User
function rowToUser(row: any): User {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    picture: row.picture || '',
    password: row.password || undefined,
    role: row.role || 'user',
    auth_provider: row.auth_provider || 'local',
    must_change_password: row.must_change_password === 1,
    failed_login_attempts: row.failed_login_attempts || 0,
    locked_until: row.locked_until || undefined,
    token_version: row.token_version || 0,
    created_at: row.created_at,
    last_login: row.last_login,
  };
}

// User operations
export async function createOrUpdateUser(data: {
  id: string;
  email: string;
  name: string;
  picture: string;
}): Promise<User> {
  const db = await getDb();

  const existing = await db.execute({
    sql: "SELECT * FROM users WHERE id = ?",
    args: [data.id],
  });

  if (existing.rows.length > 0) {
    await db.execute({
      sql: `UPDATE users SET email = ?, name = ?, picture = ?, last_login = datetime('now') WHERE id = ?`,
      args: [data.email, data.name, data.picture, data.id],
    });
    logger.debug({ userId: data.id }, "User updated");
  } else {
    await db.execute({
      sql: `INSERT INTO users (id, email, name, picture, created_at, last_login) VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))`,
      args: [data.id, data.email, data.name, data.picture],
    });
    logger.debug({ userId: data.id }, "User created");
  }

  return (await getUserById(data.id))!;
}

export async function getUserById(id: string): Promise<User | undefined> {
  const db = await getDb();
  const result = await db.execute({
    sql: "SELECT * FROM users WHERE id = ?",
    args: [id],
  });

  if (result.rows.length === 0) return undefined;
  return rowToUser(result.rows[0]);
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const db = await getDb();
  const result = await db.execute({
    sql: "SELECT * FROM users WHERE email = ?",
    args: [email],
  });

  if (result.rows.length === 0) return undefined;
  return rowToUser(result.rows[0]);
}

export async function createLocalUser(data: {
  email: string;
  name: string;
  password: string;
  role?: 'user' | 'admin' | 'super_admin';
  must_change_password?: boolean;
}): Promise<User> {
  const db = await getDb();

  const id = `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const role = data.role || 'user';
  const mustChangePassword = data.must_change_password ? 1 : 0;

  await db.execute({
    sql: `INSERT INTO users (id, email, name, password, role, auth_provider, picture, must_change_password, created_at, last_login)
     VALUES (?, ?, ?, ?, ?, 'local', '', ?, datetime('now'), datetime('now'))`,
    args: [id, data.email, data.name, data.password, role, mustChangePassword],
  });

  logger.debug({ userId: id, email: data.email }, "Local user created");
  return (await getUserById(id))!;
}

export async function updateUserPassword(userId: string, newPassword: string, mustChangePassword: boolean = false): Promise<void> {
  const db = await getDb();

  await db.execute({
    sql: `UPDATE users SET password = ?, must_change_password = ?, token_version = token_version + 1 WHERE id = ?`,
    args: [newPassword, mustChangePassword ? 1 : 0, userId],
  });

  logger.debug({ userId }, "User password updated and sessions invalidated");
}

export async function incrementFailedLoginAttempts(userId: string): Promise<number> {
  const db = await getDb();

  await db.execute({
    sql: `UPDATE users SET failed_login_attempts = failed_login_attempts + 1 WHERE id = ?`,
    args: [userId],
  });

  const user = await getUserById(userId);
  return user?.failed_login_attempts || 0;
}

export async function resetFailedLoginAttempts(userId: string): Promise<void> {
  const db = await getDb();

  await db.execute({
    sql: `UPDATE users SET failed_login_attempts = 0, locked_until = NULL WHERE id = ?`,
    args: [userId],
  });

  logger.debug({ userId }, "Failed login attempts reset");
}

export async function lockAccount(userId: string, durationMinutes: number): Promise<void> {
  const db = await getDb();
  const lockedUntil = new Date(Date.now() + durationMinutes * 60 * 1000).toISOString();

  await db.execute({
    sql: `UPDATE users SET locked_until = ? WHERE id = ?`,
    args: [lockedUntil, userId],
  });

  logger.warn({ userId, lockedUntil }, "Account locked due to failed login attempts");
}

export function isAccountLocked(user: User): boolean {
  if (!user.locked_until) return false;

  const lockExpiry = new Date(user.locked_until);
  const now = new Date();

  return lockExpiry > now;
}

export async function incrementTokenVersion(userId: string): Promise<void> {
  const db = await getDb();

  await db.execute({
    sql: `UPDATE users SET token_version = token_version + 1 WHERE id = ?`,
    args: [userId],
  });

  logger.debug({ userId }, "Token version incremented");
}

// Session operations
export async function createSession(data: {
  total_questions: number;
  correct: number;
  percentage: number;
  user_id?: string;
}): Promise<Session> {
  const db = await getDb();

  const result = await db.execute({
    sql: data.user_id
      ? `INSERT INTO sessions (timestamp, total_questions, correct, percentage, user_id) VALUES (datetime('now'), ?, ?, ?, ?)`
      : `INSERT INTO sessions (timestamp, total_questions, correct, percentage) VALUES (datetime('now'), ?, ?, ?)`,
    args: data.user_id
      ? [data.total_questions, data.correct, data.percentage, data.user_id]
      : [data.total_questions, data.correct, data.percentage],
  });

  const id = Number(result.lastInsertRowid);
  logger.debug({ sessionId: id, ...data }, "Session created");
  return (await getSession(id))!;
}

export async function getSession(id: number): Promise<Session | undefined> {
  const db = await getDb();
  const result = await db.execute({
    sql: "SELECT * FROM sessions WHERE id = ?",
    args: [id],
  });

  if (result.rows.length === 0) return undefined;

  const row = result.rows[0];
  return {
    id: Number(row.id),
    timestamp: row.timestamp as string,
    total_questions: Number(row.total_questions),
    correct: Number(row.correct),
    percentage: Number(row.percentage),
    user_id: row.user_id as string | undefined,
  };
}

export async function getAllSessions(userId?: string): Promise<Session[]> {
  const db = await getDb();

  const result = userId
    ? await db.execute({
        sql: "SELECT * FROM sessions WHERE user_id = ? ORDER BY timestamp DESC",
        args: [userId],
      })
    : await db.execute("SELECT * FROM sessions ORDER BY timestamp DESC");

  return result.rows.map((row) => ({
    id: Number(row.id),
    timestamp: row.timestamp as string,
    total_questions: Number(row.total_questions),
    correct: Number(row.correct),
    percentage: Number(row.percentage),
    user_id: row.user_id as string | undefined,
  }));
}

// Question result operations
export async function createQuestionResult(data: {
  session_id: number;
  question_id: string;
  question_text: string;
  user_answer: string;
  correct_answer: string;
  is_correct: boolean;
  subtopic: string;
}): Promise<void> {
  const db = await getDb();

  await db.execute({
    sql: `INSERT INTO question_results (session_id, question_id, question_text, user_answer, correct_answer, is_correct, subtopic)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [
      data.session_id,
      data.question_id,
      data.question_text,
      data.user_answer,
      data.correct_answer,
      data.is_correct ? 1 : 0,
      data.subtopic,
    ],
  });

  logger.debug({ questionId: data.question_id, isCorrect: data.is_correct }, "Question result saved");
}

export async function getResultsBySession(sessionId: number): Promise<QuestionResult[]> {
  const db = await getDb();
  const result = await db.execute({
    sql: "SELECT * FROM question_results WHERE session_id = ?",
    args: [sessionId],
  });

  return result.rows.map((row) => ({
    id: Number(row.id),
    session_id: Number(row.session_id),
    question_id: row.question_id as string,
    question_text: row.question_text as string,
    user_answer: row.user_answer as string,
    correct_answer: row.correct_answer as string,
    is_correct: Number(row.is_correct),
    subtopic: row.subtopic as string,
  }));
}

export async function getAllResults(userId?: string): Promise<QuestionResult[]> {
  const db = await getDb();

  const result = userId
    ? await db.execute({
        sql: `
      SELECT qr.* FROM question_results qr
      INNER JOIN sessions s ON qr.session_id = s.id
      WHERE s.user_id = ?
      ORDER BY qr.id DESC
    `,
        args: [userId],
      })
    : await db.execute("SELECT * FROM question_results ORDER BY id DESC");

  return result.rows.map((row) => ({
    id: Number(row.id),
    session_id: Number(row.session_id),
    question_id: row.question_id as string,
    question_text: row.question_text as string,
    user_answer: row.user_answer as string,
    correct_answer: row.correct_answer as string,
    is_correct: Number(row.is_correct),
    subtopic: row.subtopic as string,
  }));
}

export async function getResultsBySubtopic(subtopic: string, userId?: string): Promise<QuestionResult[]> {
  const db = await getDb();

  const result = userId
    ? await db.execute({
        sql: `
      SELECT qr.* FROM question_results qr
      INNER JOIN sessions s ON qr.session_id = s.id
      WHERE qr.subtopic = ? AND s.user_id = ?
    `,
        args: [subtopic, userId],
      })
    : await db.execute({
        sql: "SELECT * FROM question_results WHERE subtopic = ?",
        args: [subtopic],
      });

  return result.rows.map((row) => ({
    id: Number(row.id),
    session_id: Number(row.session_id),
    question_id: row.question_id as string,
    question_text: row.question_text as string,
    user_answer: row.user_answer as string,
    correct_answer: row.correct_answer as string,
    is_correct: Number(row.is_correct),
    subtopic: row.subtopic as string,
  }));
}

export async function getResultsByQuestionId(questionId: string, userId?: string): Promise<QuestionResult[]> {
  const db = await getDb();

  const result = userId
    ? await db.execute({
        sql: `
      SELECT qr.* FROM question_results qr
      INNER JOIN sessions s ON qr.session_id = s.id
      WHERE qr.question_id = ? AND s.user_id = ?
      ORDER BY qr.id DESC
    `,
        args: [questionId, userId],
      })
    : await db.execute({
        sql: "SELECT * FROM question_results WHERE question_id = ? ORDER BY id DESC",
        args: [questionId],
      });

  return result.rows.map((row) => ({
    id: Number(row.id),
    session_id: Number(row.session_id),
    question_id: row.question_id as string,
    question_text: row.question_text as string,
    user_answer: row.user_answer as string,
    correct_answer: row.correct_answer as string,
    is_correct: Number(row.is_correct),
    subtopic: row.subtopic as string,
  }));
}

export async function getMissedQuestionIds(userId?: string): Promise<string[]> {
  const db = await getDb();

  const result = userId
    ? await db.execute({
        sql: `
      SELECT DISTINCT qr.question_id FROM question_results qr
      INNER JOIN sessions s ON qr.session_id = s.id
      WHERE qr.is_correct = 0 AND s.user_id = ?
    `,
        args: [userId],
      })
    : await db.execute("SELECT DISTINCT question_id FROM question_results WHERE is_correct = 0");

  return result.rows.map((row) => row.question_id as string);
}

export async function getAnsweredQuestionIds(userId?: string): Promise<string[]> {
  const db = await getDb();

  const result = userId
    ? await db.execute({
        sql: `
      SELECT DISTINCT qr.question_id FROM question_results qr
      INNER JOIN sessions s ON qr.session_id = s.id
      WHERE s.user_id = ?
    `,
        args: [userId],
      })
    : await db.execute("SELECT DISTINCT question_id FROM question_results");

  return result.rows.map((row) => row.question_id as string);
}

export async function getTopicStats(userId?: string): Promise<Record<string, { total: number; correct: number }>> {
  const db = await getDb();

  const result = userId
    ? await db.execute({
        sql: `
      SELECT
        qr.subtopic,
        COUNT(*) as total,
        SUM(qr.is_correct) as correct
      FROM question_results qr
      INNER JOIN sessions s ON qr.session_id = s.id
      WHERE s.user_id = ?
      GROUP BY qr.subtopic
    `,
        args: [userId],
      })
    : await db.execute(`
      SELECT
        subtopic,
        COUNT(*) as total,
        SUM(is_correct) as correct
      FROM question_results
      GROUP BY subtopic
    `);

  const stats: Record<string, { total: number; correct: number }> = {};
  for (const row of result.rows) {
    stats[row.subtopic as string] = {
      total: Number(row.total),
      correct: Number(row.correct),
    };
  }

  return stats;
}

// Initialize database on module load
initDb().catch((err) => logger.error(sanitizeError(err), "Failed to initialize database"));
