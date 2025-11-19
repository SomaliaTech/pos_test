import menuModel from "../models/menu.js";
import orderModel from "../models/order.js";
import userModel from "../models/user.js";
import { Reports } from "../utilis/roports.js";

export const ReportsUsers = async (req, res, next) => {
  try {
    const users = await Reports(userModel);

    res.status(200).send({
      sucess: true,
      users,
    });
  } catch (err) {
    next(err);
  }
};

// Get revenue data for the last 12 months
export const getRevenueData = async (req, res) => {
  try {
    const currentDate = new Date();
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(currentDate.getMonth() - 11); // Last 12 months

    const revenueData = await orderModel.aggregate([
      {
        $match: {
          orderDate: {
            $gte: twelveMonthsAgo,
            $lte: currentDate,
          },
          orderStatus: { $ne: "cancelled" }, // Exclude cancelled orders
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$orderDate" },
            month: { $month: "$orderDate" },
          },
          income: { $sum: "$bills.totalWithTax" },
          expense: {
            $sum: {
              $subtract: ["$bills.totalWithTax", "$bills.total"],
            },
          },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1,
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $dateToString: {
              format: "%Y-%m",
              date: {
                $dateFromParts: {
                  year: "$_id.year",
                  month: "$_id.month",
                  day: 1,
                },
              },
            },
          },
          income: 1,
          expense: 1,
        },
      },
    ]);

    // Ensure we have all 12 months (fill missing months with 0)
    const completeData = fillMissingMonths(revenueData, twelveMonthsAgo);

    res.json(completeData);
  } catch (error) {
    console.error("Error fetching revenue data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Helper function to fill missing months with zero values
function fillMissingMonths(data, startDate) {
  const result = [];
  const currentDate = new Date();

  for (let i = 0; i < 12; i++) {
    const date = new Date(startDate);
    date.setMonth(startDate.getMonth() + i);

    const monthKey = date.toISOString().substring(0, 7); // "YYYY-MM"

    const existingMonth = data.find((item) => item.month === monthKey);

    if (existingMonth) {
      result.push(existingMonth);
    } else {
      result.push({
        month: monthKey,
        income: 0,
        expense: 0,
      });
    }
  }

  return result;
}
export const weeklyMenus = async (req, res) => {
  try {
    const menus = await menuModel.find();

    // 1️⃣ Flatten menu.items into one array
    let items = [];
    menus.forEach((menu) => items.push(...menu.items));

    // 2️⃣ Sort by newest first (optional)
    items.sort((a, b) => b.createdAt - a.createdAt);

    // 3️⃣ Pick only 7 items
    const sevenItems = items.slice(0, 7);

    // 4️⃣ Calculate total revenue
    const totalRevenue = sevenItems.reduce(
      (sum, item) => sum + Number(item.price),
      0
    );

    // 5️⃣ Colors (looped)
    const colors = [
      "#F59E0B",
      "#10B981",
      "#6366F1",
      "#EC4899",
      "#3B82F6",
      "#8B5CF6",
    ];

    // 6️⃣ Build response for charts
    const categories = sevenItems.map((item, i) => ({
      name: item.name,
      value: Number(((item.price / totalRevenue) * 100).toFixed(1)), // %
      price: item.price,
      color: colors[i % colors.length],
      total: `$${item.price.toFixed(2)}`,
      createdAt: item.createdAt,
    }));

    res.json({
      success: true,
      totalRevenue: `$${totalRevenue.toFixed(2)}`,
      categories,
    });
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
