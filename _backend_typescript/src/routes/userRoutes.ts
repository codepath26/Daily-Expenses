import { Router } from "express";
import { singupHandler } from "../controllers/userController.js";


const router = Router();


router.get('/signup' , singupHandler)
router.get('/login' , () => {})
router.get('/user' , () => {});

export default router;