import { Request, Response, NextFunction } from 'express';
import { BudgetModel, Budget } from '../models/budgetModel';

export class BudgetController {
  static async upsertBudget(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { category, monthly_limit, month, year }: Budget = req.body;

      if (!category || monthly_limit === undefined || !month || !year) {
        res.status(400).json({ error: 'Missing required fields: category, monthly_limit, month, year.' });
        return;
      }

      await BudgetModel.upsert({ category, monthly_limit, month, year });
      const budget = await BudgetModel.findByCategory(category);

      res.status(200).json({
        message: 'Budget saved successfully',
        data: budget,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllBudgets(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const budgets = await BudgetModel.findAll();
      res.status(200).json({
        data: budgets,
        count: budgets.length,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteBudget(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const id = parseInt(req.params.id as string, 10);
      const deleted = await BudgetModel.delete(id);

      if (!deleted) {
        res.status(404).json({ error: 'Budget not found.' });
        return;
      }

      res.status(200).json({ message: 'Budget deleted successfully.' });
    } catch (error) {
      next(error);
    }
  }
}
