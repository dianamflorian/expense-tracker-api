import { Router } from 'express';
import { BudgetController } from '../controllers/budgetController';

const router = Router();

router.post('/', BudgetController.upsertBudget);
router.get('/', BudgetController.getAllBudgets);
router.delete('/:id', BudgetController.deleteBudget);

export default router;
