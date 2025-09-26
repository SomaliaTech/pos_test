import mongoose from "mongoose";
import orderModel from "../models/order.js";
import userModel from "../models/user.js";

export const addOrder = async (req, res, next) => {
  try {
    const { customerDetails, bills, ...otherOrderData } = req.body;

    if (customerDetails) {
      if (customerDetails?.userId) {
        const order = await orderModel.create({
          customerDetails,
          bills,
          ...otherOrderData,
        });
        await userModel.findByIdAndUpdate(
          customerDetails.userId,
          {
            $inc: { totalDebt: bills.totalWithTax },
          },
          { new: true }
        );
        res
          .status(201)
          .json({ success: true, message: "Order created!", data: order });
      } else {
        const order = await orderModel.create({
          customerDetails,
          bills,
          ...otherOrderData,
        });

        res
          .status(201)
          .json({ success: true, message: "Order created!", data: order });
      }
    } else {
      const order = await orderModel.create({
        bills,
        ...otherOrderData,
      });

      res
        .status(201)
        .json({ success: true, message: "Order created!", data: order });
    }
  } catch (error) {
    next(error);
  }
};

export const getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // const id = "68ce62457a980dba1dca0265";
    console.log("ids", id);
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(501).send("Invalid id!");
    // }

    const orders = await orderModel.find({
      "customerDetails.userId": id,
    });
    console.log(orders);
    if (!orders || orders.length === 0) {
      const orders = await orderModel.findOne({
        _id: id,
      });
      res.status(200).json({
        success: true,
        orders,
        // customerDetails: user,
        // totalDebt: user.totalDebt,
      });
      console.log("yes");
      // return res.status(201).send("Order not found!");
    }

    const user = await userModel.findById(id);
    res.status(200).json({
      success: true,
      orders,
      customerDetails: user,
      totalDebt: user?.totalDebt ? user.totalDebt : 0,
    });
  } catch (error) {
    next(error);
  }
};
export const getOrderDetails = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(501).send("Invalid id!");
    }
    console.log("id", id);

    const orders = await orderModel.findOne({
      "customerDetails.userId": id,
    });
    console.log(orders);

    if (!orders || orders.length === 0) {
      const orders = await orderModel.findOne({
        _id: id,
      });
      res.status(200).json({
        success: true,
        orders,
        // customerDetails: user,
        // totalDebt: user.totalDebt,
      });
      console.log("yes");
      // return res.status(201).send("Order not found!");
    }

    const user = await userModel.findById(id);
    res.status(200).json({
      success: true,
      orders,
      customerDetails: user,
      totalDebt: user.totalDebt,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrdersWithoutTable = async (req, res, next) => {
  try {
    const query = await orderModel.find({ customerDetails: $in });
    if (!query.customerDetails) {
      const orders = await orderModel.find().sort({ createdAt: -1 });
      res.status(200).json({ orders, message: "sucessfly" });
    } else {
      const orders = await orderModel.find().sort({ createdAt: -1 });
      res.status(200).json({ orders, message: "sucessfly" });
    }
  } catch (error) {
    next(error);
  }
};
export const getOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 });
    res.status(200).json({ orders, message: "sucessfly" });
  } catch (error) {
    next(error);
  }
};

export const updateOrder = async (req, res, next) => {
  try {
    const { orderStatus } = req.body;
    const { id } = req.params;
    console.log(id);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(501).send("Invalid id!");
    }

    const order = await orderModel.findByIdAndUpdate(
      id,
      { orderStatus },
      { new: true }
    );
    console.log(order);
    if (!order) {
      return res.status(501).send("something wrong");
    }

    res
      .status(200)
      .json({ success: true, message: "Order updated", data: order });
  } catch (error) {
    next(error);
  }
};
