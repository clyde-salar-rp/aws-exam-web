import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Migration to add must_change_password flag
 * This migration is idempotent - safe to run multiple times
 */
export async function addMustChangePassword(dbPath?: string): Promise<void> {
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
    console.log('Running must_change_password migration...');

    // Check if column already exists
    const userColumns = db.exec(`PRAGMA table_info(users)`);
    const hasMustChangePassword = userColumns.length > 0 &&
      userColumns[0].values.some((row: any) => row[1] === 'must_change_password');

    if (!hasMustChangePassword) {
      // Add must_change_password column with default false
      db.run(`ALTER TABLE users ADD COLUMN must_change_password INTEGER NOT NULL DEFAULT 0`);
      console.log('✓ Added must_change_password column to users table');
    } else {
      console.log('✓ must_change_password column already exists');
    }

    // Save database to disk
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DATABASE_PATH, buffer);

    console.log('Must change password migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    db.close();
  }
}

// Run migration if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  addMustChangePassword().catch(console.error);
}
