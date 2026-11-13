import { Router } from 'express';
import { ExpenseController } from '../controllers/expenseController';

const router = Router();

router.post('/', ExpenseController.createExpense);
router.get('/', ExpenseController.getAllExpenses);
router.get('/:id', ExpenseController.getExpenseById);
router.put('/:id', ExpenseController.updateExpense);
router.delete('/:id', ExpenseController.deleteExpense);

export default router;
