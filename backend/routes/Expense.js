import {Router} from 'express';
import { addExpense, deleteExpense, getExpenses, updateExpense } from '../controllers/expense.js';

const router = Router();

 router.post('/expense',addExpense);
 router.get('/expense',getExpenses);
 router.patch('/expense/:id',updateExpense);
 router.delete('/expense/:id',deleteExpense);

 export default router;
