import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import { findUserById } from "../services/userServices.js";

const { SECRET_KEY } = process.env;

export const validToken = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log(SECRET_KEY);
  try {
    if (!authorization) {
      throw HttpError(401, "not authozation");
    }

    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw HttpError(401, "not authozation");
    }
    console.log(token);
    const { id } = jwt.verify(token, "secret");
    const user = await findUserById(id);
    if (!user || !user.token || user.token !== token) {
      throw HttpError(401, "not authozation");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
