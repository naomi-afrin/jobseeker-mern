import mongoose from "mongoose";
import Jobs from "../models/jobsModel.js";
import Companies from "../models/companyModel.js";
import Users from "../models/userModel.js";

export const createJob = async (req, res, next) => {
  try {
    const {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      desc,
      requirements,
    } = req.body;

    if (
      !jobTitle ||
      !jobType ||
      !location ||
      !salary ||
      !requirements ||
      !desc
    ) {
      next("Please Provide All Required Fields");
      return;
    }

    const companyId = req.user?.userId;
    console.log('companyId:', companyId); 
    if (!mongoose.Types.ObjectId.isValid(companyId))
      return res.status(404).send(`No Company with id: ${companyId}`);  // if the company ID is a valid MongoDB ObjectId

    const jobPost = {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      detail: { desc, requirements },
      company: companyId,
    };

    const job = new Jobs(jobPost);
    await job.save();

    const company = await Companies.findById(companyId);
    
    if (!company) {
        return res.status(404).send(`No Company with id: ${companyId}`); 
      }
    console.log('Found job:', job);
    company.jobPosts.push(job._id);
    const updateCompany = await Companies.findByIdAndUpdate(companyId, company, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Job Posted Successfully",
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const updateJob = async (req, res, next) => {
  try {
    const {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      desc,
      requirements,
    } = req.body;

    if (
      !jobTitle ||
      !jobType ||
      !location ||
      !salary ||
      !desc ||
      !requirements
    ) {
      next("Please Provide All Required Fields");
      return;
    }

    const companyId = req.user?.userId;

    if (!mongoose.Types.ObjectId.isValid(companyId))
      return res.status(404).send(`No Company with id: ${companyId}`);

    const { jobId } = req.params;

    const jobPost = {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      detail: { desc, requirements },
      _id: jobId,
    };

    await Jobs.findByIdAndUpdate(jobId, jobPost, { new: true });

    res.status(200).json({
      success: true,
      message: "Job Post Updated Successfully",
      jobPost,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};


//  to retrieve job posts based on query parameters
export const getJobPosts = async (req, res, next) => {
  try {
    const { search, sort, location, jtype, exp } = req.query;
    const types = jtype?.split(",");
    const experience = exp?.split("-");

    let queryObject = {};

    if (location) {
      queryObject.location = { $regex: location, $options: "i" };
    }

    if (jtype) {
      queryObject.jobType = { $in: types };
    }

    if (exp) {
      queryObject.experience = {
        $gte: Number(experience[0]) - 1,
        $lte: Number(experience[1]) + 1,
      };
    }

    if (search) {
      const searchQuery = {
        $or: [
          { jobTitle: { $regex: search, $options: "i" } },
          { jobType: { $regex: search, $options: "i" } },
        ],
      };
      queryObject = { ...queryObject, ...searchQuery };
    }

    let queryResult = Jobs.find(queryObject).populate({
      path: "company",
      select: "-password",
    });

    if (sort === "Newest") {
      queryResult = queryResult.sort("-createdAt");
    }
    if (sort === "Oldest") {
      queryResult = queryResult.sort("createdAt");
    }
    if (sort === "A-Z") {
      queryResult = queryResult.sort("jobTitle");
    }
    if (sort === "Z-A") {
      queryResult = queryResult.sort("-jobTitle");
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const totalJobs = await Jobs.countDocuments(queryResult);
    const numOfPage = Math.ceil(totalJobs / limit);

    queryResult = queryResult.limit(limit * page);

    const jobs = await queryResult;

    res.status(200).json({
      success: true,
      totalJobs,
      data: jobs,
      page,
      numOfPage,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const job = await Jobs.findById({ _id: id }).populate({
      path: "company",
      select: "-password",
    });

    if (!job) {
      return res.status(200).send({
        message: "Job Post Not Found",
        success: false,
      });
    }

    const searchQuery = {
      $or: [
        { jobTitle: { $regex: job?.jobTitle, $options: "i" } },
        { jobType: { $regex: job?.jobType, $options: "i" } },
      ],
    };

    let queryResult = Jobs.find(searchQuery)
      .populate({
        path: "company",
        select: "-password",
      })
      .sort({ _id: -1 });

    queryResult = queryResult.limit(6);
    const similarJobs = await queryResult;

    res.status(200).json({
      success: true,
      data: job,
      similarJobs,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const deleteJobPost = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Jobs.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Job Post Deleted Successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};


// jobController.js

// ... (previous code)

export const applyJob = async (req, res, next) => {
  try {
    const userId = req.user?.userId;
    const jobId = req.params.jobId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(404).send(`No User with id: ${userId}`);
    }

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(404).send(`No Job with id: ${jobId}`);
    }

    // Fetch the job from the database
    const job = await Jobs.findById(jobId);

    // Check if the job is found
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    // Check if the user already applied for the job
    if (job.applicants && job.applicants.includes(userId)) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job.",
      });
    }

    // Add the user ID to the job's applications array
    job.applicants.push(userId);

    // Save the updated job post
    const updatedJob = await job.save();


     // Update the user's applied array with the Job ID
     const user = await Users.findByIdAndUpdate(
      userId,
      { $push: { applied: jobId } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Application submitted successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const showApplicants = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(jobId)) {
      return res.status(404).send(`No Job with id: ${jobId}`);
    }

    // Fetch the job from the database
    const job = await Jobs.findById(jobId);

    // Check if the job is found
    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found.",
      });
    }

    // Fetch users who have applied for the job
    const applicants = await Users.find({ applied: job._id });

    // Exclude sensitive information from the response
    const applicantsInfo = applicants.map(applicant => ({
      _id: applicant._id,
      username: applicant.username,
      email: applicant.email,
      firstName: applicant.firstName,
      lastName: applicant.lastName,
      createdAt: applicant.createdAt,
    }));

    res.status(200).json({
      success: true,
      data: applicantsInfo,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};