import mongoose from "mongoose";

const menuSchema = new mongoose.Schema(
  {
    name: String,
    icon: String,
    categoryName: String,
    items: [
      {
        name: String,
        price: Number,
        category: String,
        image: String,
      },
    ], // optionally you could reference items if normalized
  },
  { timestamps: true }
);

const menuModel = mongoose.model("Menu", menuSchema);
export default menuModel;
