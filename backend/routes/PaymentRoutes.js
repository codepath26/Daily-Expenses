import { Router } from "express";
import {
  checkout,
  paymentVerification,
} from "../controllers/paymentController.js";
import authenticateUser from "../middleware/authenticate.js";
const router = Router();

router.post("/checkout", authenticateUser, checkout);
router.post("/paymentverification", paymentVerification);

export default router;
