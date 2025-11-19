import express from "express";
import connectDB from "../config/databse.js";
import config from "../config/config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import routerUser from "../routers/user.js";
import routerMenu from "../routers/menu.js";
import routerReport from "../routers/reports.js";
import routerOrder from "../routers/order.js";
import routerTable from "../routers/table.js";
import { v2 as cloudinary } from "cloudinary";
import routerContect from "../routers/contect.js";
const app = express();

const PORT = config.port;
connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Middlewares
export { cloudinary };
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000/"],
  })
);
app.use(express.json({ limit: "50mb" })); // parse incoming request in json format
app.use(cookieParser());

// Root Endpoint
app.get("/", (req, res) => {
  res.json({ message: "Hello from POS Server!" });
});

// Other Endpoints

// app.use("/api/order", "./routes/orderRoute");
app.use("/api/user", routerUser);
app.use("/api/contect", routerContect);
app.use("/api/menus", routerMenu);
app.use("/api/analytic", routerReport);
app.use("/api/orders", routerOrder);
app.use("/api/table", routerTable);
// app.use("/api/payment", "./routes/paymentRoute");

// Global Error Handler
// app.use(globalErrorHandler);

// Server
app.listen(PORT, () => {
  console.log(`☑️  POS Server is listening on port ${PORT}`);
});
