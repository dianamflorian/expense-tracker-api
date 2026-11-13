import { Database } from '../database';

export interface Budget {
  id?: number;
  category: string;
  monthly_limit: number;
  month: number;
  year: number;
  created_at?: string;
}

export class BudgetModel {
  static upsert(budget: Budget): Promise<number> {
    return new Promise((resolve, reject) => {
      const db = Database.getInstance();
      const query = `
        INSERT INTO budgets (category, monthly_limit, month, year)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(category) DO UPDATE SET
          monthly_limit = excluded.monthly_limit,
          month = excluded.month,
          year = excluded.year
      `;
      db.run(query, [budget.category, budget.monthly_limit, budget.month, budget.year], function (err) {
        if (err) reject(err);
        else resolve(this.lastID || 1);
      });
    });
  }

  static findAll(): Promise<Budget[]> {
    return new Promise((resolve, reject) => {
      const db = Database.getInstance();
      db.all(`SELECT * FROM budgets ORDER BY year DESC, month DESC`, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows as Budget[]);
      });
    });
  }

  static findByCategory(category: string): Promise<Budget | undefined> {
    return new Promise((resolve, reject) => {
      const db = Database.getInstance();
      db.get(`SELECT * FROM budgets WHERE category = ?`, [category], (err, row) => {
        if (err) reject(err);
        else resolve(row as Budget | undefined);
      });
    });
  }

  static delete(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const db = Database.getInstance();
      db.run(`DELETE FROM budgets WHERE id = ?`, [id], function (err) {
        if (err) reject(err);
        else resolve(this.changes > 0);
      });
    });
  }
}
