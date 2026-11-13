import { Router } from 'express';
import { ExpenseController } from '../controllers/expenseController';
import { validateExpense } from '../middlewares/validateExpense';

const router = Router();

router.post('/', validateExpense, ExpenseController.createExpense);
router.get('/', ExpenseController.getAllExpenses);
router.get('/summary', ExpenseController.getExpenseSummary);
router.get('/:id', ExpenseController.getExpenseById);
router.put('/:id', validateExpense, ExpenseController.updateExpense);
router.delete('/:id', ExpenseController.deleteExpense);

export default router;
