import mongoose from "mongoose";
import Users from "../models/userModel.js";
import Jobs from "../models/jobsModel.js";



export const updateUser = async (req, res, next) => {
    const {
      firstName,
      lastName,
      email,
      bio,
    } = req.body;
  
    try {
      if (!firstName || !lastName || !email ||  !bio) {
        next("Please provide all required fields");
      }
  
      const id = req.user.userId;
  
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send(`No User with id: ${id}`);
      }
  
      const updateUser = {
        firstName,
        lastName,
        email,
        bio,
        _id: id,
      };
  
      const user = await Users.findByIdAndUpdate(id, updateUser, { new: true });
  
      const token = user.createJWT();
  
      user.password = undefined;
  
      res.status(200).json({
        sucess: true,
        message: "User updated successfully",
        user,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  };


  export const getUser = async (req, res, next) => {
    try {
      const id = req.user.userId;
  
      const user = await Users.findById({ _id: id });
  
      if (!user) {
        return res.status(200).send({
          message: "User Not Found",
          success: false,
        });
      }
  
      user.password = undefined;
  
      res.status(200).json({
        success: true,
        user: user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "auth error",
        success: false,
        error: error.message,
      });
    }
  };


  export const getAppliedJobs = async (req, res, next) => {
    try {
      const userId = req.user?.userId;
  
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(404).send(`No User with id: ${userId}`);
      }
  
      // Fetch the user from the database
      const user = await Users.findById(userId);
  
      // Check if the user is found
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }
  
      // Fetch jobs based on the applied array in the user document
      const appliedJobs = await Jobs.find({ _id: { $in: user.applied } })
        .populate({
          path: "company",
          select: "-password",
        })
        .sort("-createdAt");
  
      // Extract relevant information about applied jobs
      const jobsInfo = appliedJobs.map(job => ({
        _id: job._id,
        jobTitle: job.jobTitle,
        jobType: job.jobType,
        location: job.location,
        salary: job.salary,
        company: job.company,
        createdAt: job.createdAt,
      }));
  
      res.status(200).json({
        success: true,
        data: jobsInfo,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };