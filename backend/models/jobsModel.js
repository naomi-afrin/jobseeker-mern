import mongoose, { Schema } from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: { 
      type: Schema.Types.ObjectId, 
      ref: "Company" },  //Refers to Company Schema
    jobTitle: { 
      type: String, 
      required: [true, "Job Title is required"] },
    jobType: { type: String, required: [true, "Job Type is required"] },
    location: { 
      type: String, 
      required: [true, "Location is required"] },
    salary: { 
      type: Number, 
      required: [true, "Salary is required"] },
    vacancies: { 
      type: Number },
    experience: {
       type: Number, default: 0 },
    detail: [{ 
      desc: { type: String }, 
      requirements: { type: String } }],
    applicants: [{ 
      type: Schema.Types.ObjectId, 
      ref: "Users" }],  //Will store the User id
  },
  { timestamps: true }
);

const Jobs = mongoose.model("Jobs", jobSchema);
export default Jobs;