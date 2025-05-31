import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
// signup controller ...//

export const signupController = async (req, res, next) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;
    //validate
    if (!username) {
      next("username is required");
    }
    if (!email) {
      next("email is required");
    }
    if (!password) {
      next("password is required");
    }

    //check if a user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      next("user already exists");
    }
    const accountType = 'seeker'
    const newUser = await User.create({ username, email, password, firstName, lastName, accountType});
    // json token
    const token = newUser.createJWT();

    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    newUser.password = undefined;

    res.status(201).send({
      success: true,
      message: "User created successfully",
      user: newUser,
      token
    });
  } catch (error) {
    next(error);
  }
};

// login controller ... //
export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: "All fields are required" });
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.json({ message: "Incorrect password or email" });
    }

    // can alternatively use user.comparePassword
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: "Incorrect password or email" });
    }
    //after that create a token & send response
    user.password = undefined; // for security purpose
    const token = user.createJWT();
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(200).json({
      message: "User logged in successfully",
      success: true,
      user,
      token,
      accountType: "seeker"
    });
    next();
  } catch (error) {
    next(error);
  }
};
