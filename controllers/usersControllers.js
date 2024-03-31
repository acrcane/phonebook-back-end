import { isUserExists, createUser } from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";
import {
  updateUserWithToken,
  logoutService,
} from "../services/userServices.js";

export const signup = async (req, res, next) => {
  const { email, name } = req.body;
  try {
    const user = await isUserExists(email);
    if (user) {
      throw HttpError(409, "user with already exists");
    }
    const newUser = await createUser(req.body);
    res.status(201).json({
      token: newUser.token,
      user: {
        name,
        email,
        avatar: newUser.avatar,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await isUserExists(email);
    if (!user) {
      throw HttpError(401, "wrong email or password");
    }
    const isValidPass = await user.comparePassword(password);
    if (!isValidPass) {
      throw HttpError(401, "wrong email or password");
    }
    const authUser = await updateUserWithToken(user._id);
    res.json({
      user: { email, avatar: user.avatar, name: user.name },
      token: authUser.token,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  const { _id } = req.user;
  await logoutService(_id);
  res.sendStatus(204);
};

export const getCurrent = (req, res) => {
  const { name, email, avatar } = req.user;
  res.json({
    name,
    email,
    avatar,
  });
};
