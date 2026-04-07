import { Router } from "express";
import { singupHandler , loginHanlder } from "../controllers/userController.js";


const router = Router();


router.post('/signup' , singupHandler)
router.post('/login' , loginHanlder);
router.get('/user' , () => {});

export default router;