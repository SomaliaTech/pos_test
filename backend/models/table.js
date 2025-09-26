import mongoose from "mongoose";
const tableSchema = new mongoose.Schema(
  {
    tableNo: { type: Number, required: true, unique: true },
    status: {
      type: String,
      default: "available",
    },

    time: { type: String },
    seats: {
      type: Number,
      required: true,
    },
    currentOrder: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  },
  { timestamps: true }
);

const tableModel = mongoose.model("Table", tableSchema);
export default tableModel;
