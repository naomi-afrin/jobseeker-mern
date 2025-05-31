import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to database ${mongoose.connection.host}`.green);
  } catch (error) {
    console.log(`Mongodb erro ${error}`.bgRed.white);
  }
};

export default connectDB;
