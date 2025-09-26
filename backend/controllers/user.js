import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";
import data from "../config/data.js";

export const register = async (req, res, next) => {
  console.log(req.body);

  try {
    const { name, phone, email, password, role } = req.body;

    if (!name || !phone || !email || !password || !role) {
      return res.status(502).json({ message: "All fields are required!" });
    }

    const isUserPresent = await userModel.findOne({ email });
    if (isUserPresent) {
      return res.status(502).json({ message: "User already exist!" });
    }

    const user = { name, phone, email, password, role };
    const newUser = userModel(user);
    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "New user created!", data: newUser });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
      return res.status(502).json({ message: "All fields are required!" });
    }

    const isUserPresent = await userModel.findOne({ email });
    if (!isUserPresent) {
      return res.status(502).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, isUserPresent.password);
    if (!isMatch) {
      return res.status(502).json({ message: "Invalid Credentials" });
    }

    const accessToken = jwt.sign(
      { _id: isUserPresent._id },
      process.env.JSON_WEB_ACCESS_TOKEN,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("accessToken", accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.status(200).json({
      success: true,
      message: "User login successfully!",
      user: isUserPresent,
      accessToken,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserData = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};
export const getUserAllData = async (req, res, next) => {
  try {
    const users = await userModel.find({
      role: { $nin: ["admin", "emplyee"] },
    });
    res.status(200).json({ success: true, users });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res
      .status(200)
      .json({ success: true, message: "User logout successfully!" });
  } catch (error) {
    next(error);
  }
};

export const registerTest = async (req, res) => {
  try {
    data;
    const preperUserPassword = await Promise.all(
      data.users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );
    const user = await userModel.insertMany(preperUserPassword);
    res.status(200).send({
      message: "good",
      user,
    });
  } catch (err) {
    console.log(err);
  }
};
