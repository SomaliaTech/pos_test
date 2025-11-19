import express from "express";
import { CreateSendMessage, GetAllMessage } from "../controllers/contect.js";

const router = express.Router();

router.post("/sendMessage", CreateSendMessage);
router.get("/all-contect", GetAllMessage);

export default router;
