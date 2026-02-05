import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Migration to add authentication tables and columns
 * This migration is idempotent - safe to run multiple times
 */
export async function runAuthMigration(dbPath?: string): Promise<void> {
  // Use provided path or default to data/exam.db
  const DATABASE_PATH = dbPath || path.join(__dirname, '..', '..', '..', 'data', 'exam.db');

  const SQL = await initSqlJs();
  let db: SqlJsDatabase;

  // Load existing database
  if (fs.existsSync(DATABASE_PATH)) {
    const buffer = fs.readFileSync(DATABASE_PATH);
    db = new SQL.Database(buffer);
  } else {
    throw new Error(`Database not found at ${DATABASE_PATH}`);
  }

  try {
    console.log('Running authentication migration...');

    // Create users table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        picture TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        last_login TEXT NOT NULL DEFAULT (datetime('now'))
      )
    `);

    console.log('✓ Users table created');

    // Create index on email for faster lookups
    db.run(`
      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)
    `);

    console.log('✓ Users email index created');

    // Check if user_id column already exists in sessions table
    const sessionColumns = db.exec(`PRAGMA table_info(sessions)`);
    const hasUserId = sessionColumns.length > 0 &&
      sessionColumns[0].values.some((row: any) => row[1] === 'user_id');

    if (!hasUserId) {
      // Add user_id column to sessions table
      db.run(`ALTER TABLE sessions ADD COLUMN user_id TEXT`);
      console.log('✓ Added user_id column to sessions table');

      // Create index on user_id for faster queries
      db.run(`CREATE INDEX IF NOT EXISTS idx_sessions_user ON sessions(user_id)`);
      console.log('✓ Sessions user_id index created');
    } else {
      console.log('✓ user_id column already exists in sessions table');
    }

    // Save database to disk
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DATABASE_PATH, buffer);

    console.log('Authentication migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    db.close();
  }
}

// Run migration if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runAuthMigration().catch(console.error);
}
