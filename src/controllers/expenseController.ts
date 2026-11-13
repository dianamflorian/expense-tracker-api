import { Request, Response, NextFunction } from 'express';
import { ExpenseModel, Expense } from '../models/expenseModel';

export class ExpenseController {
  static async createExpense(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title, amount, category, date, notes }: Expense = req.body;

      if (!title || amount === undefined || !category || !date) {
        res.status(400).json({ error: 'Missing required fields: title, amount, category, date.' });
        return;
      }

      const id = await ExpenseModel.create({ title, amount, category, date, notes });
      const newExpense = await ExpenseModel.findById(id);

      res.status(201).json({
        message: 'Expense created successfully',
        data: newExpense,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllExpenses(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const expenses = await ExpenseModel.findAll();
      res.status(200).json({
        data: expenses,
        count: expenses.length,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getExpenseById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      const expense = await ExpenseModel.findById(id);

      if (!expense) {
        res.status(404).json({ error: 'Expense not found.' });
        return;
      }

      res.status(200).json({ data: expense });
    } catch (error) {
      next(error);
    }
  }

  static async updateExpense(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      const updated = await ExpenseModel.update(id, req.body);

      if (!updated) {
        res.status(404).json({ error: 'Expense not found or no changes made.' });
        return;
      }

      const updatedExpense = await ExpenseModel.findById(id);
      res.status(200).json({
        message: 'Expense updated successfully',
        data: updatedExpense,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteExpense(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      const deleted = await ExpenseModel.delete(id);

      if (!deleted) {
        res.status(404).json({ error: 'Expense not found.' });
        return;
      }

      res.status(200).json({ message: 'Expense deleted successfully.' });
    } catch (error) {
      next(error);
    }
  }

  static async getExpenseSummary(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const summary = await ExpenseModel.getSummary();
      const totalSpending = summary.reduce((acc, curr) => acc + curr.total_amount, 0);

      res.status(200).json({
        data: {
          categories: summary,
          total_spending: totalSpending,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
