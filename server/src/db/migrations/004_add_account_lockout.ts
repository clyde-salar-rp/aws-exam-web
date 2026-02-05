import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Migration: Add account lockout fields
 * Adds failed_login_attempts, locked_until, and token_version columns for account security
 * This migration is idempotent - safe to run multiple times
 */
export async function addAccountLockout(dbPath?: string): Promise<void> {
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
    console.log('Running account lockout migration...');

    // Check which columns already exist
    const userColumns = db.exec(`PRAGMA table_info(users)`);
    const existingColumns = userColumns.length > 0
      ? userColumns[0].values.map((row: any) => row[1])
      : [];

    // Add failed_login_attempts column if it doesn't exist
    if (!existingColumns.includes('failed_login_attempts')) {
      db.run(`ALTER TABLE users ADD COLUMN failed_login_attempts INTEGER DEFAULT 0`);
      console.log('✓ Added failed_login_attempts column to users table');
    } else {
      console.log('✓ failed_login_attempts column already exists');
    }

    // Add locked_until column if it doesn't exist
    if (!existingColumns.includes('locked_until')) {
      db.run(`ALTER TABLE users ADD COLUMN locked_until TEXT`);
      console.log('✓ Added locked_until column to users table');
    } else {
      console.log('✓ locked_until column already exists');
    }

    // Add token_version column if it doesn't exist (for session invalidation)
    if (!existingColumns.includes('token_version')) {
      db.run(`ALTER TABLE users ADD COLUMN token_version INTEGER DEFAULT 0`);
      console.log('✓ Added token_version column to users table');
    } else {
      console.log('✓ token_version column already exists');
    }

    // Save database to disk
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DATABASE_PATH, buffer);

    console.log('Account lockout migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    db.close();
  }
}

// Run migration if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  addAccountLockout().catch(console.error);
}
