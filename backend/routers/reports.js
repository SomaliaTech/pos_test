import express from "express";
import {
  getRevenueData,
  ReportsUsers,
  weeklyMenus,
} from "../controllers/anyatics.js";
import { getOrders, orderOverViewWeekly } from "../controllers/order.js";

const router = express.Router();

router.get("/", getOrders);
router.get("/users", ReportsUsers);
router.get("/weekly", orderOverViewWeekly);
router.get("/order-revenue", getRevenueData);
router.get("/weekly-menus", weeklyMenus);
router.get("/test", (req, res) => {
  res.json({ message: "Hello from POS Server!" });
});

export default router;
