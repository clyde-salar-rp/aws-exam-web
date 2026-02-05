import initSqlJs, { Database as SqlJsDatabase } from "sql.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import logger, { sanitizeError } from "../lib/logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "..", "..", "data", "exam.db");

let db: SqlJsDatabase | null = null;

async function initDb(): Promise<SqlJsDatabase> {
  if (db) return db;

  const SQL = await initSqlJs();

  // Try to load existing database
  if (fs.existsSync(dbPath)) {
    logger.debug({ dbPath }, "Loading existing database");
    const buffer = fs.readFileSync(dbPath);
    db = new SQL.Database(buffer);
  } else {
    logger.info({ dbPath }, "Creating new database");
    db = new SQL.Database();
  }

  // Initialize schema
  db.run(`
    CREATE TABLE IF NOT EXISTS sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      timestamp TEXT NOT NULL DEFAULT (datetime('now')),
      total_questions INTEGER NOT NULL,
      correct INTEGER NOT NULL,
      percentage REAL NOT NULL
    )
  `);

  db.run(`
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

  // Create indexes
  db.run(`CREATE INDEX IF NOT EXISTS idx_question_results_session ON question_results(session_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_question_results_question ON question_results(question_id)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_question_results_subtopic ON question_results(subtopic)`);

  logger.debug("Database schema initialized");
  saveDb();
  return db;
}

function saveDb(): void {
  if (!db) return;
  const data = db.export();
  const buffer = Buffer.from(data);
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(dbPath, buffer);
  logger.debug("Database saved to disk");
}

// Ensure db is initialized
export async function getDb(): Promise<SqlJsDatabase> {
  return initDb();
}

export interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  password?: string; // Optional for OAuth users
  role: 'user' | 'admin' | 'super_admin';
  auth_provider: 'local' | 'google';
  must_change_password: boolean;
  failed_login_attempts: number;
  locked_until?: string; // ISO timestamp when account will be unlocked
  token_version: number; // For invalidating old JWT tokens
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

// User operations
export async function createOrUpdateUser(data: {
  id: string;
  email: string;
  name: string;
  picture: string;
}): Promise<User> {
  const db = await getDb();

  // Check if user exists
  const existing = db.exec("SELECT * FROM users WHERE id = ?", [data.id]);

  if (existing.length > 0 && existing[0].values.length > 0) {
    // Update existing user
    db.run(
      `UPDATE users SET email = ?, name = ?, picture = ?, last_login = datetime('now') WHERE id = ?`,
      [data.email, data.name, data.picture, data.id]
    );
    logger.debug({ userId: data.id }, "User updated");
  } else {
    // Create new user
    db.run(
      `INSERT INTO users (id, email, name, picture, created_at, last_login) VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))`,
      [data.id, data.email, data.name, data.picture]
    );
    logger.debug({ userId: data.id }, "User created");
  }

  saveDb();
  return (await getUserById(data.id))!;
}

export async function getUserById(id: string): Promise<User | undefined> {
  const db = await getDb();
  const result = db.exec("SELECT * FROM users WHERE id = ?", [id]);

  if (result.length === 0 || result[0].values.length === 0) return undefined;

  const row = result[0].values[0];
  const columns = result[0].columns;

  return {
    id: row[columns.indexOf("id")] as string,
    email: row[columns.indexOf("email")] as string,
    name: row[columns.indexOf("name")] as string,
    picture: row[columns.indexOf("picture")] as string,
    password: row[columns.indexOf("password")] as string | undefined,
    role: (row[columns.indexOf("role")] as 'user' | 'admin' | 'super_admin') || 'user',
    auth_provider: (row[columns.indexOf("auth_provider")] as 'local' | 'google') || 'local',
    must_change_password: (row[columns.indexOf("must_change_password")] as number) === 1,
    failed_login_attempts: (row[columns.indexOf("failed_login_attempts")] as number) || 0,
    locked_until: row[columns.indexOf("locked_until")] as string | undefined,
    token_version: (row[columns.indexOf("token_version")] as number) || 0,
    created_at: row[columns.indexOf("created_at")] as string,
    last_login: row[columns.indexOf("last_login")] as string,
  };
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const db = await getDb();
  const result = db.exec("SELECT * FROM users WHERE email = ?", [email]);

  if (result.length === 0 || result[0].values.length === 0) return undefined;

  const row = result[0].values[0];
  const columns = result[0].columns;

  return {
    id: row[columns.indexOf("id")] as string,
    email: row[columns.indexOf("email")] as string,
    name: row[columns.indexOf("name")] as string,
    picture: row[columns.indexOf("picture")] as string,
    password: row[columns.indexOf("password")] as string | undefined,
    role: (row[columns.indexOf("role")] as 'user' | 'admin' | 'super_admin') || 'user',
    auth_provider: (row[columns.indexOf("auth_provider")] as 'local' | 'google') || 'local',
    must_change_password: (row[columns.indexOf("must_change_password")] as number) === 1,
    failed_login_attempts: (row[columns.indexOf("failed_login_attempts")] as number) || 0,
    locked_until: row[columns.indexOf("locked_until")] as string | undefined,
    token_version: (row[columns.indexOf("token_version")] as number) || 0,
    created_at: row[columns.indexOf("created_at")] as string,
    last_login: row[columns.indexOf("last_login")] as string,
  };
}

export async function createLocalUser(data: {
  email: string;
  name: string;
  password: string;
  role?: 'user' | 'admin' | 'super_admin';
  must_change_password?: boolean;
}): Promise<User> {
  const db = await getDb();

  // Generate a unique ID for local users
  const id = `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const role = data.role || 'user';
  const mustChangePassword = data.must_change_password ? 1 : 0;

  db.run(
    `INSERT INTO users (id, email, name, password, role, auth_provider, picture, must_change_password, created_at, last_login)
     VALUES (?, ?, ?, ?, ?, 'local', '', ?, datetime('now'), datetime('now'))`,
    [id, data.email, data.name, data.password, role, mustChangePassword]
  );

  logger.debug({ userId: id, email: data.email }, "Local user created");
  saveDb();
  return (await getUserById(id))!;
}

export async function updateUserPassword(userId: string, newPassword: string, mustChangePassword: boolean = false): Promise<void> {
  const db = await getDb();

  // Update password and increment token version to invalidate old sessions
  db.run(
    `UPDATE users SET password = ?, must_change_password = ?, token_version = token_version + 1 WHERE id = ?`,
    [newPassword, mustChangePassword ? 1 : 0, userId]
  );

  logger.debug({ userId }, "User password updated and sessions invalidated");
  saveDb();
}

/**
 * Increment failed login attempts for a user
 * Returns the new attempt count
 */
export async function incrementFailedLoginAttempts(userId: string): Promise<number> {
  const db = await getDb();

  db.run(
    `UPDATE users SET failed_login_attempts = failed_login_attempts + 1 WHERE id = ?`,
    [userId]
  );

  saveDb();

  const user = await getUserById(userId);
  return user?.failed_login_attempts || 0;
}

/**
 * Reset failed login attempts (called on successful login)
 */
export async function resetFailedLoginAttempts(userId: string): Promise<void> {
  const db = await getDb();

  db.run(
    `UPDATE users SET failed_login_attempts = 0, locked_until = NULL WHERE id = ?`,
    [userId]
  );

  logger.debug({ userId }, "Failed login attempts reset");
  saveDb();
}

/**
 * Lock user account for specified duration in minutes
 */
export async function lockAccount(userId: string, durationMinutes: number): Promise<void> {
  const db = await getDb();
  const lockedUntil = new Date(Date.now() + durationMinutes * 60 * 1000).toISOString();

  db.run(
    `UPDATE users SET locked_until = ? WHERE id = ?`,
    [lockedUntil, userId]
  );

  logger.warn({ userId, lockedUntil }, "Account locked due to failed login attempts");
  saveDb();
}

/**
 * Check if user account is currently locked
 * Returns true if locked, false if unlocked or lock expired
 */
export function isAccountLocked(user: User): boolean {
  if (!user.locked_until) return false;

  const lockExpiry = new Date(user.locked_until);
  const now = new Date();

  return lockExpiry > now;
}

/**
 * Increment token version to invalidate all existing JWT tokens
 * Used for security events like password changes
 */
export async function incrementTokenVersion(userId: string): Promise<void> {
  const db = await getDb();

  db.run(
    `UPDATE users SET token_version = token_version + 1 WHERE id = ?`,
    [userId]
  );

  logger.debug({ userId }, "Token version incremented");
  saveDb();
}

// Session operations
export async function createSession(data: {
  total_questions: number;
  correct: number;
  percentage: number;
  user_id?: string;
}): Promise<Session> {
  const db = await getDb();

  if (data.user_id) {
    db.run(
      `INSERT INTO sessions (timestamp, total_questions, correct, percentage, user_id) VALUES (datetime('now'), ?, ?, ?, ?)`,
      [data.total_questions, data.correct, data.percentage, data.user_id]
    );
  } else {
    db.run(
      `INSERT INTO sessions (timestamp, total_questions, correct, percentage) VALUES (datetime('now'), ?, ?, ?)`,
      [data.total_questions, data.correct, data.percentage]
    );
  }

  const result = db.exec("SELECT last_insert_rowid() as id");
  const id = result[0].values[0][0] as number;

  logger.debug({ sessionId: id, ...data }, "Session created");
  saveDb();
  return (await getSession(id))!;
}

export async function getSession(id: number): Promise<Session | undefined> {
  const db = await getDb();
  const result = db.exec("SELECT * FROM sessions WHERE id = ?", [id]);

  if (result.length === 0 || result[0].values.length === 0) return undefined;

  const row = result[0].values[0];
  const columns = result[0].columns;

  const userIdIndex = columns.indexOf("user_id");
  return {
    id: row[columns.indexOf("id")] as number,
    timestamp: row[columns.indexOf("timestamp")] as string,
    total_questions: row[columns.indexOf("total_questions")] as number,
    correct: row[columns.indexOf("correct")] as number,
    percentage: row[columns.indexOf("percentage")] as number,
    user_id: userIdIndex >= 0 ? (row[userIdIndex] as string | null) || undefined : undefined,
  };
}

export async function getAllSessions(userId?: string): Promise<Session[]> {
  const db = await getDb();

  let result;
  if (userId) {
    result = db.exec("SELECT * FROM sessions WHERE user_id = ? ORDER BY timestamp DESC", [userId]);
  } else {
    result = db.exec("SELECT * FROM sessions ORDER BY timestamp DESC");
  }

  if (result.length === 0) return [];

  const columns = result[0].columns;
  const userIdIndex = columns.indexOf("user_id");
  return result[0].values.map((row) => ({
    id: row[columns.indexOf("id")] as number,
    timestamp: row[columns.indexOf("timestamp")] as string,
    total_questions: row[columns.indexOf("total_questions")] as number,
    correct: row[columns.indexOf("correct")] as number,
    percentage: row[columns.indexOf("percentage")] as number,
    user_id: userIdIndex >= 0 ? (row[userIdIndex] as string | null) || undefined : undefined,
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

  db.run(
    `INSERT INTO question_results (session_id, question_id, question_text, user_answer, correct_answer, is_correct, subtopic)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      data.session_id,
      data.question_id,
      data.question_text,
      data.user_answer,
      data.correct_answer,
      data.is_correct ? 1 : 0,
      data.subtopic,
    ]
  );

  logger.debug({ questionId: data.question_id, isCorrect: data.is_correct }, "Question result saved");
  saveDb();
}

export async function getResultsBySession(sessionId: number): Promise<QuestionResult[]> {
  const db = await getDb();
  const result = db.exec("SELECT * FROM question_results WHERE session_id = ?", [sessionId]);

  if (result.length === 0) return [];

  const columns = result[0].columns;
  return result[0].values.map((row) => ({
    id: row[columns.indexOf("id")] as number,
    session_id: row[columns.indexOf("session_id")] as number,
    question_id: row[columns.indexOf("question_id")] as string,
    question_text: row[columns.indexOf("question_text")] as string,
    user_answer: row[columns.indexOf("user_answer")] as string,
    correct_answer: row[columns.indexOf("correct_answer")] as string,
    is_correct: row[columns.indexOf("is_correct")] as number,
    subtopic: row[columns.indexOf("subtopic")] as string,
  }));
}

export async function getAllResults(userId?: string): Promise<QuestionResult[]> {
  const db = await getDb();

  let result;
  if (userId) {
    result = db.exec(`
      SELECT qr.* FROM question_results qr
      INNER JOIN sessions s ON qr.session_id = s.id
      WHERE s.user_id = ?
      ORDER BY qr.id DESC
    `, [userId]);
  } else {
    result = db.exec("SELECT * FROM question_results ORDER BY id DESC");
  }

  if (result.length === 0) return [];

  const columns = result[0].columns;
  return result[0].values.map((row) => ({
    id: row[columns.indexOf("id")] as number,
    session_id: row[columns.indexOf("session_id")] as number,
    question_id: row[columns.indexOf("question_id")] as string,
    question_text: row[columns.indexOf("question_text")] as string,
    user_answer: row[columns.indexOf("user_answer")] as string,
    correct_answer: row[columns.indexOf("correct_answer")] as string,
    is_correct: row[columns.indexOf("is_correct")] as number,
    subtopic: row[columns.indexOf("subtopic")] as string,
  }));
}

export async function getResultsBySubtopic(subtopic: string, userId?: string): Promise<QuestionResult[]> {
  const db = await getDb();

  let result;
  if (userId) {
    result = db.exec(`
      SELECT qr.* FROM question_results qr
      INNER JOIN sessions s ON qr.session_id = s.id
      WHERE qr.subtopic = ? AND s.user_id = ?
    `, [subtopic, userId]);
  } else {
    result = db.exec("SELECT * FROM question_results WHERE subtopic = ?", [subtopic]);
  }

  if (result.length === 0) return [];

  const columns = result[0].columns;
  return result[0].values.map((row) => ({
    id: row[columns.indexOf("id")] as number,
    session_id: row[columns.indexOf("session_id")] as number,
    question_id: row[columns.indexOf("question_id")] as string,
    question_text: row[columns.indexOf("question_text")] as string,
    user_answer: row[columns.indexOf("user_answer")] as string,
    correct_answer: row[columns.indexOf("correct_answer")] as string,
    is_correct: row[columns.indexOf("is_correct")] as number,
    subtopic: row[columns.indexOf("subtopic")] as string,
  }));
}

export async function getResultsByQuestionId(questionId: string, userId?: string): Promise<QuestionResult[]> {
  const db = await getDb();

  let result;
  if (userId) {
    result = db.exec(`
      SELECT qr.* FROM question_results qr
      INNER JOIN sessions s ON qr.session_id = s.id
      WHERE qr.question_id = ? AND s.user_id = ?
      ORDER BY qr.id DESC
    `, [questionId, userId]);
  } else {
    result = db.exec(
      "SELECT * FROM question_results WHERE question_id = ? ORDER BY id DESC",
      [questionId]
    );
  }

  if (result.length === 0) return [];

  const columns = result[0].columns;
  return result[0].values.map((row) => ({
    id: row[columns.indexOf("id")] as number,
    session_id: row[columns.indexOf("session_id")] as number,
    question_id: row[columns.indexOf("question_id")] as string,
    question_text: row[columns.indexOf("question_text")] as string,
    user_answer: row[columns.indexOf("user_answer")] as string,
    correct_answer: row[columns.indexOf("correct_answer")] as string,
    is_correct: row[columns.indexOf("is_correct")] as number,
    subtopic: row[columns.indexOf("subtopic")] as string,
  }));
}

export async function getMissedQuestionIds(userId?: string): Promise<string[]> {
  const db = await getDb();

  let result;
  if (userId) {
    result = db.exec(`
      SELECT DISTINCT qr.question_id FROM question_results qr
      INNER JOIN sessions s ON qr.session_id = s.id
      WHERE qr.is_correct = 0 AND s.user_id = ?
    `, [userId]);
  } else {
    result = db.exec(
      "SELECT DISTINCT question_id FROM question_results WHERE is_correct = 0"
    );
  }

  if (result.length === 0) return [];
  return result[0].values.map((row) => row[0] as string);
}

export async function getAnsweredQuestionIds(userId?: string): Promise<string[]> {
  const db = await getDb();

  let result;
  if (userId) {
    result = db.exec(`
      SELECT DISTINCT qr.question_id FROM question_results qr
      INNER JOIN sessions s ON qr.session_id = s.id
      WHERE s.user_id = ?
    `, [userId]);
  } else {
    result = db.exec("SELECT DISTINCT question_id FROM question_results");
  }

  if (result.length === 0) return [];
  return result[0].values.map((row) => row[0] as string);
}

export async function getTopicStats(userId?: string): Promise<Record<string, { total: number; correct: number }>> {
  const db = await getDb();

  let result;
  if (userId) {
    result = db.exec(`
      SELECT
        qr.subtopic,
        COUNT(*) as total,
        SUM(qr.is_correct) as correct
      FROM question_results qr
      INNER JOIN sessions s ON qr.session_id = s.id
      WHERE s.user_id = ?
      GROUP BY qr.subtopic
    `, [userId]);
  } else {
    result = db.exec(`
      SELECT
        subtopic,
        COUNT(*) as total,
        SUM(is_correct) as correct
      FROM question_results
      GROUP BY subtopic
    `);
  }

  if (result.length === 0) return {};

  const columns = result[0].columns;
  return result[0].values.reduce((acc, row) => {
    const subtopic = row[columns.indexOf("subtopic")] as string;
    acc[subtopic] = {
      total: row[columns.indexOf("total")] as number,
      correct: row[columns.indexOf("correct")] as number,
    };
    return acc;
  }, {} as Record<string, { total: number; correct: number }>);
}

// Initialize database on module load
initDb().catch((err) => logger.error(sanitizeError(err), "Failed to initialize database"));
