import mongoose from "mongoose";
import colors from "colors";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected`.green);
  } catch (error) {
    console.log(`MongoDB Error ${error}`.red);
  }
};

export default connectDb;
