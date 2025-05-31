import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJob,
  deleteJobPost,
  getJobById,
  getJobPosts,
  updateJob,
  applyJob,
  showApplicants
} from "../controllers/jobController.js";

const router = express.Router();

// POST JOB
router.post("/upload-job", userAuth, createJob);

// UPDATE JOB
router.put("/update-job/:jobId", userAuth, updateJob);

// GET JOB POST
router.get("/find-jobs", getJobPosts);
router.get("/get-job-detail/:id", getJobById);

// DELETE JOB POST
router.delete("/delete-job/:id", userAuth, deleteJobPost);


// APPLY TO JOB
router.post("/:jobId/apply", userAuth, applyJob);


// SHOW APPLICANTS
router.get("/:jobId/applicants",userAuth, showApplicants);


export default router;