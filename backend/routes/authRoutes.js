import express from "express";
import { loginController, signupController } from "../controllers/authController.js";


// router object ..//
const router = express.Router();


//routes ....
router.post('/login', loginController)

router.post('/signup', signupController)


export default router;