import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';

// Valid industries
const validIndustries = ["Technology", "Finance", "Healthcare", "Education", "Other"];

// Schema definition
const companySchema = new Schema({
  name: {
    type: String,
    required: [true, "Company Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least"],
    select: true,
  },
  contact: { type: String },
  location: { type: String },
  about: { type: String },
  profileUrl: { type: String },
  jobPosts: [{ type: Schema.Types.ObjectId, ref: "Jobs" }],
},
// Additional schema options
{ timestamps: true }
);



// middlewares 
// To hash the password
companySchema.pre('save', async function(){   // implement this function before saving
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt);
});

//compare password
companySchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
}

//JSON WEBTOKEN
// make custome methods to create JWT
companySchema.methods.createJWT = function() {
  return JWT.sign({userId:this._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
  // will store our token locally
}

// Model creation and export
export default mongoose.model("Company", companySchema);
