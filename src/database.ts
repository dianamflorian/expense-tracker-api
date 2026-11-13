import sqlite3 from 'sqlite3';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export class Database {
  private static instance: sqlite3.Database | null = null;
  private static currentPath: string | null = null;

  public static getInstance(customPath?: string): sqlite3.Database {
    const dbPath = customPath || process.env.DB_PATH || path.resolve(__dirname, '../database.sqlite');

    if (Database.instance && Database.currentPath !== dbPath) {
      Database.instance.close();
      Database.instance = null;
    }

    if (!Database.instance) {
      Database.currentPath = dbPath;
      Database.instance = new sqlite3.Database(dbPath, (err) => {
        if (err) {
          console.error('Error opening database ' + dbPath, err.message);
        } else {
          console.log('Connected to the SQLite database:', dbPath);
        }
      });
      Database.instance.run('PRAGMA foreign_keys = ON;');
      Database.initTables();
    }
    return Database.instance;
  }

  private static initTables(): void {
    if (!Database.instance) return;
    Database.instance.exec(`
      CREATE TABLE IF NOT EXISTS expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        amount REAL NOT NULL,
        category TEXT NOT NULL,
        date TEXT NOT NULL,
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS budgets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category TEXT NOT NULL UNIQUE,
        monthly_limit REAL NOT NULL,
        month INTEGER NOT NULL,
        year INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public static close(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (Database.instance) {
        Database.instance.close((err) => {
          if (err) reject(err);
          else {
            Database.instance = null;
            Database.currentPath = null;
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }
}
