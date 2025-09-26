import userModel from "../models/user.js";
import { Reports } from "../utilis/roports.js";

export const ReportsUsers = async (req, res, next) => {
  try {
    const users = await Reports(userModel);

    res.status(200).send({
      sucess: true,
      users,
    });
  } catch (err) {
    next(err);
  }
};
