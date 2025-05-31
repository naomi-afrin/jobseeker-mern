import mongoose, { Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";


//schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
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
      minlength: [6, "password should be atleast 6 character"],
      select: true,
    },
    bio: {
      type: String,
    },
    applied: [{ 
      type: Schema.Types.ObjectId, 
      ref: "Jobs"
    }],  //Will store the Job id
    accountType: {
      type: String
    }
  },
  { timestamps: true }
);

// middlewares: //
//for password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
// for password checking 
userSchema.methods.comparPassword = async function (userPassword) {
  const isMatched = await bcrypt.compare(userPassword, this.password)
  return isMatched;
}

// JSON webtoken
userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id, username: this.username }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export default mongoose.model("User", userSchema);