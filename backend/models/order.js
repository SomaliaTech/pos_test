import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerDetails: {
      name: { type: String },
      phone: { type: String },
      guests: { type: Number },
      userId: { type: String },
    },
    orderStatus: {
      type: String,
      required: true,
    },
    customer: {
      type: String,
      default: "outisde" | "inside",
    },
    orderDate: {
      type: Date,
      default: Date.now(),
    },
    bills: {
      total: { type: Number, required: true },
      tax: { type: Number, required: true },
      totalWithTax: { type: Number, required: true },
    },
    items: [],
    table: { type: mongoose.Schema.Types.ObjectId, ref: "Table" },
    paymentMethod: {
      type: String,
      default: "Cash",
    },
    paymentData: {},
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
