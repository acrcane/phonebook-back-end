import { isUserExists } from "../services/userServices.js";
import HttpError from "../helpers/HttpError.js";

export const signup = async (res, req, next) => {
  const { email } = req.body;
  try {
    const user = await isUserExists({ email });
    if (user) {
      throw HttpError(409, "user with already exists");
    }
  } catch (error) {
    next(error);
  }
};
