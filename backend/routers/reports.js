import { ReportsUsers } from "../controllers/anyatics.js";
import express from "express";

const router = express();

router.get("/users", ReportsUsers);

export default router;
