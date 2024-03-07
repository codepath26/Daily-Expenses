import { Router } from "express";
import {
  addIncome,
  deleteIncome,
  getIncomes,
  updateIncome,
} from "../controllers/income.js";
import authenticateUser from "../middleware/authenticate.js";

const router = Router();

router.post("/income", authenticateUser, addIncome);
router.get("/income", authenticateUser, getIncomes);
router.patch("/income/:id", updateIncome);
router.delete("/income/:id", deleteIncome);

export default router;
