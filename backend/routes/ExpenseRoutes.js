import { Router } from "express";
import {
  addExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "../controllers/expenseController.js";
import authenticateUser from "../middleware/authenticate.js";

const router = Router();

router.post("/expense", authenticateUser, addExpense);
router.get("/expense", authenticateUser, getExpenses);
router.patch("/expense/:id", updateExpense);
router.delete("/expense/:id", deleteExpense);

export default router;
