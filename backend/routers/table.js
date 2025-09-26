import express from "express";
import {
  addTable,
  getTableDetails,
  getTables,
  updateTable,
} from "../controllers/table.js";
import { CreateModelMenu } from "../controllers/menus.js";

const router = express();

router.post("/create", CreateModelMenu);
router.get("/", getTables);

router.put("/update-table/:id", updateTable);
router.get("/details/:id", getTableDetails);
export default router;
