import { Router } from "express";
import { leaderboardHandler } from "../controllers/expenseController.js";
import authenticateUser from "../middleware/authenticate.js";

const router = Router();

router.get("/leaderboard", authenticateUser, leaderboardHandler);

export default router;
