import express from "express";
import {testGetController, testPostController} from "../controllers/testController.js";
import userAuth from "../middlewares/authMiddleware.js";

// router object ..//
const router = express.Router();


//routes ....
router.get('/test-get', testGetController)
router.post('/test-post', userAuth,testPostController)


export default router;