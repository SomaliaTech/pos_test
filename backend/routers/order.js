import express from "express";
import {
  addOrder,
  getOrderById,
  getOrderDetails,
  getOrders,
  updateOrder,
} from "../controllers/order.js";

const router = express();

router.post("/create", addOrder);
router.get("/", getOrders);
router.get("/:id", getOrderById);
router.get("/details/:id", getOrderDetails);
router.put("/update-order/:id", updateOrder);

export default router;
