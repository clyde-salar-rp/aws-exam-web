import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Migration to add roles and password authentication
 * This migration is idempotent - safe to run multiple times
 */
export async function addRolesAndPasswords(dbPath?: string): Promise<void> {
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
    console.log('Running roles and passwords migration...');

    // Check if password column already exists
    const userColumns = db.exec(`PRAGMA table_info(users)`);
    const hasPassword = userColumns.length > 0 &&
      userColumns[0].values.some((row: any) => row[1] === 'password');
    const hasRole = userColumns.length > 0 &&
      userColumns[0].values.some((row: any) => row[1] === 'role');
    const hasAuthProvider = userColumns.length > 0 &&
      userColumns[0].values.some((row: any) => row[1] === 'auth_provider');

    if (!hasPassword) {
      // Add password column (nullable for OAuth users)
      db.run(`ALTER TABLE users ADD COLUMN password TEXT`);
      console.log('✓ Added password column to users table');
    } else {
      console.log('✓ Password column already exists');
    }

    if (!hasRole) {
      // Add role column with default 'user'
      db.run(`ALTER TABLE users ADD COLUMN role TEXT NOT NULL DEFAULT 'user'`);
      console.log('✓ Added role column to users table');
    } else {
      console.log('✓ Role column already exists');
    }

    if (!hasAuthProvider) {
      // Add auth_provider column to track authentication method
      db.run(`ALTER TABLE users ADD COLUMN auth_provider TEXT NOT NULL DEFAULT 'local'`);
      console.log('✓ Added auth_provider column to users table');

      // Update existing users to use 'google' as provider
      db.run(`UPDATE users SET auth_provider = 'google' WHERE password IS NULL`);
      console.log('✓ Updated existing OAuth users');
    } else {
      console.log('✓ Auth provider column already exists');
    }

    // Save database to disk
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(DATABASE_PATH, buffer);

    console.log('Roles and passwords migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    db.close();
  }
}

// Run migration if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  addRolesAndPasswords().catch(console.error);
}
