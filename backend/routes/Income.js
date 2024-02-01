import {Router} from 'express';
import { addIncome, deleteIncome, getIncomes, updateIncome } from '../controllers/income.js';

const router = Router();

 router.post('/income',addIncome);
 router.get('/income',getIncomes);
 router.patch('/income/:id',updateIncome);
 router.delete('/income/:id',deleteIncome);

 export default router;
