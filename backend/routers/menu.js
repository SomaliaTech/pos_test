import express from "express";
import {
  CreateModelMenu,
  DeleteItemMenu,
  GetAllModelMenu,
  getTrendingItems,
  UpdateItemMenu,
} from "../controllers/menus.js";
import { orderOverViewWeekly } from "../controllers/order.js";

const router = express.Router();

// Authentication Routes
router.post("/create", CreateModelMenu);
router.get("/", GetAllModelMenu);
router.delete("/delete-item/:id", DeleteItemMenu);
router.put("/update-item/:id", UpdateItemMenu);
router.get("/trending-menus", getTrendingItems);

router.get("/weekly-overview-orders", orderOverViewWeekly);

export default router;
