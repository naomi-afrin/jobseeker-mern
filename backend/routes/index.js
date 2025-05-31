import express from "express";
import jobRoute from "./jobsRoutes.js"

import testRoutes from "./testRoutes.js";
import companyRoutes from "./companyRoutes.js";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js"

const router = express.Router();

const path = "/api/v1/";

router.use(`${path}test`, testRoutes); //api/v1/test/test-get
router.use(`${path}auth`, authRoutes); //api/v1/auth/....
router.use(`${path}companies`, companyRoutes);
router.use(`${path}jobs`, jobRoute);
router.use(`${path}users`, userRoutes);

export default router;
