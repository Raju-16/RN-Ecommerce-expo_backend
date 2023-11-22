import mongoose from "mongoose";
import colors from "colors";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected`.bgGreen.white);
  } catch (error) {
    console.log(`MongoDB Error ${error}`.bgRed.white);
  }
};

export default connectDb;
