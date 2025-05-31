
import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { getUser, updateUser, getAppliedJobs } from "../controllers/userController.js";

const router = express.Router();



// GET user
router.post("/get-user", userAuth, getUser);


// UPDATE USER || PUT
router.put("/update-user", userAuth, updateUser);

// GET APPLIED JOBS
router.post("/get-applied-jobs", userAuth, getAppliedJobs);

export default router;


