import express from "express";
import { CreateModelMenu, GetAllModelMenu } from "../controllers/menus.js";

const router = express.Router();

// Authentication Routes
router.post("/create", CreateModelMenu);
router.get("/", GetAllModelMenu);

export default router;
