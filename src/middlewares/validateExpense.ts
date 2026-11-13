import { Request, Response, NextFunction } from 'express';

export const validateExpense = (req: Request, res: Response, next: NextFunction): void => {
  const { title, amount, category, date } = req.body;
  const errors: string[] = [];

  if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
    errors.push('Title must be a non-empty string.');
  } else if (req.method === 'POST' && !title) {
    errors.push('Title is required.');
  }

  if (amount !== undefined && (typeof amount !== 'number' || amount <= 0)) {
    errors.push('Amount must be a positive number greater than 0.');
  } else if (req.method === 'POST' && amount === undefined) {
    errors.push('Amount is required.');
  }

  if (category !== undefined && (typeof category !== 'string' || category.trim() === '')) {
    errors.push('Category must be a non-empty string.');
  } else if (req.method === 'POST' && !category) {
    errors.push('Category is required.');
  }

  if (date !== undefined && (typeof date !== 'string' || isNaN(Date.parse(date)))) {
    errors.push('Date must be a valid date format (YYYY-MM-DD).');
  } else if (req.method === 'POST' && !date) {
    errors.push('Date is required.');
  }

  if (errors.length > 0) {
    res.status(400).json({ error: 'Validation failed', details: errors });
    return;
  }

  next();
};
