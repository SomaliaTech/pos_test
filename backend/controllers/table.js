import mongoose from "mongoose";
import tableModel from "../models/table.js";

export const addTable = async (req, res, next) => {
  try {
    const { tableNo, seats } = req.body;
    if (!tableNo) {
      return res.status(400).json("Please provide table No!");
    }
    const isTablePresent = await tableModel.findOne({ tableNo });

    if (isTablePresent) {
      return res.status(400).json("Table already exist!");
    }

    const newTable = await tableModel.create({ tableNo, seats });

    res
      .status(201)
      .json({ success: true, message: "Table added!", data: newTable });
  } catch (error) {
    next(error);
  }
};

export const getTables = async (req, res, next) => {
  try {
    // .populate({
    //   path: "currentOrder",
    //   select: "customerDetails",
    // });
    const tables = await tableModel.find().populate({
      path: "currentOrder",
      select: "customerDetails",
    });
    res.status(200).json({ success: true, data: tables });
  } catch (error) {
    next(error);
  }
};

export const updateTable = async (req, res, next) => {
  try {
    const { status, orderId } = req.body;

    console.log("order status");
    const { id } = req.params;
    console.log("id", orderId);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json("Invalid id!");
    }

    const table = await tableModel.findByIdAndUpdate(
      id,
      { status, currentOrder: orderId },
      { new: true }
    );

    if (!table) {
      return res.status(404).json("Table not found");
    }

    res
      .status(200)
      .json({ success: true, message: "Table updated!", data: table });
  } catch (error) {
    next(error);
  }
};
export const getTableDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json("Invalid id!");
    }

    const table = await tableModel.findById(id);

    if (!table) {
      return res.status(404).json("Table not found");
    }

    res
      .status(200)
      .json({ success: true, message: "Table updated!", data: table });
  } catch (error) {
    next(error);
  }
};
