import {
  isUserExists,
  createUser,
  updateUser,
} from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";
import path from "path";
import fs from "fs/promises";
import Jimp from "jimp";
import {
  updateUserWithToken,
  logoutService,
} from "../services/userServices.js";

const avatarPath = path.resolve("public", "avatars");
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

export const updateAvatars = async (req, res) => {
  const { path: oldPath, filename } = req.file;
  const { _id } = req.user;
  const newPath = path.join(avatarPath, filename);

  const resizedAvatar = await Jimp.read(oldPath);
  await resizedAvatar.resize(250, 250).write(oldPath);

  await fs.rename(oldPath, newPath);
  const avatar = path.join("avatars", filename);
  await updateUser({ _id }, { avatarURL: avatar });
  res.json({
    avatarURL: avatar,
  });
};
