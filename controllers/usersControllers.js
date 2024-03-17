import { isUserExists, createUser } from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";

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
      },
    });
  } catch (error) {
    next(error);
  }
};
