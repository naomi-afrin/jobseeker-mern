import express from "express";

import {
  getCompaniesController,
  getCompanyJobListing,
  companyLoginController,
  companySignupController,
  getSingleCompany,
  updateCompanyProfile,
  getCompanyJobs,
} from "../controllers/companyController.js";
import userAuth from "../middlewares/authMiddleware.js";


// Create a router object
const router = express.Router();


// REGISTER
router.post("/signup", companySignupController); //signup

// LOGIN
router.post("/login", companyLoginController); //login

// GET DATA
router.get("/:id", getSingleCompany)
router.post("/get-company-joblisting", userAuth, getCompanyJobListing);
router.get("/get-company-joblisting/:id", getCompanyJobs)
router.get("/", getCompaniesController); //get all



//UPDATE DATA
router.put("/update-company", userAuth, updateCompanyProfile);

// Export the router
export default router;
