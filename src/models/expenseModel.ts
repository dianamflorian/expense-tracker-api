import { Database } from '../database';

export interface Expense {
  id?: number;
  title: string;
  amount: number;
  category: string;
  date: string;
  notes?: string;
  created_at?: string;
}

export class ExpenseModel {
  static create(expense: Expense): Promise<number> {
    return new Promise((resolve, reject) => {
      const db = Database.getInstance();
      const query = `INSERT INTO expenses (title, amount, category, date, notes) VALUES (?, ?, ?, ?, ?)`;
      db.run(query, [expense.title, expense.amount, expense.category, expense.date, expense.notes || null], function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      });
    });
  }

  static findAll(): Promise<Expense[]> {
    return new Promise((resolve, reject) => {
      const db = Database.getInstance();
      db.all(`SELECT * FROM expenses ORDER BY date DESC`, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows as Expense[]);
      });
    });
  }

  static findById(id: number): Promise<Expense | undefined> {
    return new Promise((resolve, reject) => {
      const db = Database.getInstance();
      db.get(`SELECT * FROM expenses WHERE id = ?`, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row as Expense | undefined);
      });
    });
  }

  static update(id: number, expense: Partial<Expense>): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const db = Database.getInstance();
      const fields: string[] = [];
      const values: any[] = [];

      if (expense.title !== undefined) {
        fields.push('title = ?');
        values.push(expense.title);
      }
      if (expense.amount !== undefined) {
        fields.push('amount = ?');
        values.push(expense.amount);
      }
      if (expense.category !== undefined) {
        fields.push('category = ?');
        values.push(expense.category);
      }
      if (expense.date !== undefined) {
        fields.push('date = ?');
        values.push(expense.date);
      }
      if (expense.notes !== undefined) {
        fields.push('notes = ?');
        values.push(expense.notes);
      }

      if (fields.length === 0) {
        return resolve(false);
      }

      values.push(id);
      const query = `UPDATE expenses SET ${fields.join(', ')} WHERE id = ?`;

      db.run(query, values, function (err) {
        if (err) reject(err);
        else resolve(this.changes > 0);
      });
    });
  }

  static delete(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const db = Database.getInstance();
      db.run(`DELETE FROM expenses WHERE id = ?`, [id], function (err) {
        if (err) reject(err);
        else resolve(this.changes > 0);
      });
    });
  }

  static getSummary(): Promise<{ category: string; total_amount: number; count: number }[]> {
    return new Promise((resolve, reject) => {
      const db = Database.getInstance();
      db.all(
        `SELECT category, SUM(amount) as total_amount, COUNT(*) as count FROM expenses GROUP BY category`,
        [],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows as { category: string; total_amount: number; count: number }[]);
        }
      );
    });
  }
}
