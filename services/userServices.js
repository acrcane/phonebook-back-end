import { User } from "../db/models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const { SECRET_KEY } = process.env;

export const isUserExists = async (email) => {
  const user = await User.findOne({ email });
  return user;
};

const updateUserWithToken = async (id) => {
  const token = jwt.sign({ id }, SECRET_KEY);
  const user = await User.findByIdAndUpdate(id, { token }, { new: true });
  return user;
};

export const createUser = async (userData) => {
  const user = new User(userData);
  await user.hashPassword();
  await user.save();
  const newUser = await updateUserWithToken(user._id);
  return newUser;
};
