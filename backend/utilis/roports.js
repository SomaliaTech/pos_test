import { Model, Document } from "mongoose";

///lastyear 1 / 12
// 0

export const Reports = async (model) => {
  let lastmonths = [];
  const date = new Date();
  date.setDate(date.getDate() + 1);

  for (let i = 11; i >= 0; i--) {
    const lastyear = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - i * 28
    );
    const statyear = new Date(
      lastyear.getFullYear(),
      lastyear.getMonth(),
      lastyear.getDate() - 28
    );

    // locaion string

    const lastMonth = lastyear.toLocaleString("default", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    const count = await model.countDocuments({
      createdAt: {
        $gte: statyear,
        $lt: lastyear,
      },
    });
    lastmonths.push({ month: lastMonth, count });
  }
  return { lastmonths };
};
