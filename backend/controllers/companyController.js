import mongoose from "mongoose";
import Company from "../models/companyModel.js";
import bcrypt from "bcryptjs";

// Company Auth //
// Signup Controller
export const companySignupController = async (req, res, next) => {
  try {
    const { name, email, password, location, contact, about, profileUrl } = req.body;

    // Validation
    if (!name) {
      next("company name is required");
    }
    if (!email) {
      next("email is required");
    }
    if (!password) {
      next("password is required");
    }

    // Check if a company already exists
    const existingCompany = await Company.findOne({ email });
    if (existingCompany) {
      next("Company already exists");
    }

    // Create a new company
    const newCompany = await Company.create({
      name,
      email,
      password,
      location,
      contact,
      about,
      profileUrl,
    });
    //token
    const token = newCompany.createJWT();
    res.status(201).json({
      success: true,
      message: "Company created successfully",
      company: {
        name: newCompany.name,
        email: newCompany.email,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Login Controller //
export const companyLoginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }

    // Check if a company exists with the given email
    const company = await Company.findOne({ email }).select("+password");
    if (!company) {
      return res.json({ message: "Incorrect password or email" });
    }

    // Check if the provided password is correct
    // use a library like bcrypt for secure password comparison
    const auth = await bcrypt.compare(password, company.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    // For security purposes, you might want to omit the password from the response
    company.password = undefined;
    const token = company.createJWT();

    res.status(200).json({
      success: true,
      message: "Company logged in successfully",
      company,
      token,
    });
    next();
  } catch (error) {
    next(error);
  }
};

// other routes controller //

// Upadate Company Profile
export const updateCompanyProfile = async (req, res, next) => {
  const { name, contact, location, profileUrl, about } = req.body;

  try {
    // validation
    if (!name || !contact || !location) {
      next("Please Provide All Required Fields");
      return;
    }

    const id = req.user.userId;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Company with id: ${id}`);

    const updateCompany = {
      name,
      contact,
      location,
      profileUrl,
      about,
      _id: id,
    };

    const company = await Company.findByIdAndUpdate(id, updateCompany, {
      new: true,
    });

    const token = company.createJWT();

    company.password = undefined;

    res.status(200).json({
      success: true,
      message: "Company Profile Updated SUccessfully",
      company,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

//GET ALL COMPANIES
export const getCompaniesController = async (req, res, next) => {
  try {
    const { search, sort, location } = req.query;

    //conditons for searching filters
    const queryObject = {};

    if (search) {
      queryObject.name = { $regex: search, $options: "i" };
    }

    if (location) {
      queryObject.location = { $regex: location, $options: "i" };
    }

    let queryResult = Company.find(queryObject).select("-password");

    // SORTING
    if (sort === "Newest") {
      queryResult = queryResult.sort("-createdAt");
    }
    if (sort === "Oldest") {
      queryResult = queryResult.sort("createdAt");
    }
    if (sort === "A-Z") {
      queryResult = queryResult.sort("name");
    }
    if (sort === "Z-A") {
      queryResult = queryResult.sort("-name");
    }

    // PAGINATIONS
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const skip = (page - 1) * limit;

    // records count
    const total = await Company.countDocuments(queryResult); // counts the total document that matches the query
    const numOfPage = Math.ceil(total / limit);
    // move next page;

    // show mopre instead of moving to next page
    queryResult = queryResult.limit(limit * page);

    const companies = await queryResult;

    res.status(200).json({
      success: true,
      total,
      data: companies,
      page,
      numOfPage,
    });
  } catch (error) {
    // console.log(error);
    // res.status(404).json({ message: error.message });
    next(error);
  }
};

//GET  COMPANY JOBS
export const getCompanyJobListing = async (req, res, next) => {
  const { search, sort } = req.query;
  const id = req.user.userId;

  try {
    //conditons for searching filters
    const queryObject = {};

    if (search) {
      queryObject.location = { $regex: search, $options: "i" };
    }

    let sorting;
    //sorting || another way
    if (sort === "Newest") {
      sorting = "-createdAt";
    }
    if (sort === "Oldest") {
      sorting = "createdAt";
    }
    if (sort === "A-Z") {
      sorting = "name";
    }
    if (sort === "Z-A") {
      sorting = "-name";
    }

    let queryResult = await Company.findById({ _id: id }).populate({
      path: "jobPosts",
      options: { sort: sorting },
    });
    const company = queryResult;

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

// GET SINGLE COMPANY
export const getSingleCompany = async (req, res, next) => {
  try {
    const id = req.params.id;

    const company = await Company.findById({ _id: id });

    if (!company) {
      return res.status(200).send({
        message: "Company Not Found",
        success: false,
      });
    }

    company.password = undefined;
    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};


//GET  COMPANY JOBS2
export const getCompanyJobs = async (req, res, next) => {
  const { search, sort } = req.query;
  const { id } = req.params;

  try {
    //conditons for searching filters
    const queryObject = {};

    if (search) {
      queryObject.location = { $regex: search, $options: "i" };
    }

    let sorting;
    //sorting || another way
    if (sort === "Newest") {
      sorting = "-createdAt";
    }
    if (sort === "Oldest") {
      sorting = "createdAt";
    }
    if (sort === "A-Z") {
      sorting = "name";
    }
    if (sort === "Z-A") {
      sorting = "-name";
    }

    let queryResult = await Company.findById({ _id: id }).populate({
      path: "jobPosts",
      options: { sort: sorting },
    });
    const company = queryResult;

    res.status(200).json({
      success: true,
      company,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};