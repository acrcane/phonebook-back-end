import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { DB_HOST } = process.env;

const connectDB = async () => {
  try {
    connect(DB_HOST);
    console.log("DB connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
