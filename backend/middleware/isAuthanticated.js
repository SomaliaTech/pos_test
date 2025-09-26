import config from "../config/config.js";
import userModel from "../models/user.js";
import jwt from "jsonwebtoken";
export const isAuthanticated = async (req, res, next) => {
  try {
    const { accessToken } = req.cookies;

    if (!accessToken) {
      return res.status(401, "Please provide token!");
    }

    jwt.verify(accessToken, "daljfklajflajfla", async (err, payload) => {
      if (err) {
        next(err);
        console.log(err);
      }
      const user = await userModel.findById(payload?._id);
      if (!user) {
        return res.status(401, "User not exist!");
      }

      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(401, "Invalid Token!");
  }
};
