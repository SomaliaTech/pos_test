import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/pos_system_real");
    // console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`❌ Database connection failed: ${error.message}`);
    process.exit();
  }
};

export default connectDB;
