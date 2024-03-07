import { Router } from "express";
import {
  getUsers,
  loginHandler,
  signupHandler,
} from "../controllers/userController.js";
import authenticateUser from "../middleware/authenticate.js";

const router = Router();

router.post("/signup", signupHandler);
router.post("/login", loginHandler);
router.get("/user", authenticateUser, getUsers);

export default router;
