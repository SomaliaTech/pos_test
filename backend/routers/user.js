import express from "express";
import {
  register,
  login,
  getUserData,
  logout,
  registerTest,
  getUserAllData,
} from "../controllers/user.js";
import { isAuthanticated } from "../middleware/isAuthanticated.js";
// const { isVerifiedUser } = require("../middlewares/tokenVerification");
const router = express.Router();

// Authentication Routes
router.post("/register", registerTest);
router.post("/login", login);
router.get("/me", isAuthanticated, getUserData);
router.get("/", getUserAllData);
router.post("/logout", logout);

// router.route("/").get(isVerifiedUser, getUserData);

export default router;
