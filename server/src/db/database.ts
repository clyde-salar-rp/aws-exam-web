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

export interface Session {
  id: number;
  timestamp: string;
  total_questions: number;
  correct: number;
  percentage: number;
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

// Session operations
export async function createSession(data: {
  total_questions: number;
  correct: number;
  percentage: number;
}): Promise<Session> {
  const db = await getDb();

  db.run(
    `INSERT INTO sessions (timestamp, total_questions, correct, percentage) VALUES (datetime('now'), ?, ?, ?)`,
    [data.total_questions, data.correct, data.percentage]
  );

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

  return {
    id: row[columns.indexOf("id")] as number,
    timestamp: row[columns.indexOf("timestamp")] as string,
    total_questions: row[columns.indexOf("total_questions")] as number,
    correct: row[columns.indexOf("correct")] as number,
    percentage: row[columns.indexOf("percentage")] as number,
  };
}

export async function getAllSessions(): Promise<Session[]> {
  const db = await getDb();
  const result = db.exec("SELECT * FROM sessions ORDER BY timestamp DESC");

  if (result.length === 0) return [];

  const columns = result[0].columns;
  return result[0].values.map((row) => ({
    id: row[columns.indexOf("id")] as number,
    timestamp: row[columns.indexOf("timestamp")] as string,
    total_questions: row[columns.indexOf("total_questions")] as number,
    correct: row[columns.indexOf("correct")] as number,
    percentage: row[columns.indexOf("percentage")] as number,
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

export async function getAllResults(): Promise<QuestionResult[]> {
  const db = await getDb();
  const result = db.exec("SELECT * FROM question_results ORDER BY id DESC");

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

export async function getResultsBySubtopic(subtopic: string): Promise<QuestionResult[]> {
  const db = await getDb();
  const result = db.exec("SELECT * FROM question_results WHERE subtopic = ?", [subtopic]);

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

export async function getResultsByQuestionId(questionId: string): Promise<QuestionResult[]> {
  const db = await getDb();
  const result = db.exec(
    "SELECT * FROM question_results WHERE question_id = ? ORDER BY id DESC",
    [questionId]
  );

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

export async function getMissedQuestionIds(): Promise<string[]> {
  const db = await getDb();
  const result = db.exec(
    "SELECT DISTINCT question_id FROM question_results WHERE is_correct = 0"
  );

  if (result.length === 0) return [];
  return result[0].values.map((row) => row[0] as string);
}

export async function getAnsweredQuestionIds(): Promise<string[]> {
  const db = await getDb();
  const result = db.exec("SELECT DISTINCT question_id FROM question_results");

  if (result.length === 0) return [];
  return result[0].values.map((row) => row[0] as string);
}

export async function getTopicStats(): Promise<Record<string, { total: number; correct: number }>> {
  const db = await getDb();
  const result = db.exec(`
    SELECT
      subtopic,
      COUNT(*) as total,
      SUM(is_correct) as correct
    FROM question_results
    GROUP BY subtopic
  `);

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
