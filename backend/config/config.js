import dotenv from "dotenv";
dotenv.config();

const config = {
  jsontoken: process.env.JSON_WEB_ACCESS_TOKEN,
  datebase_url: process.env.MONGODB_URI,
  port: process.env.PORT || 6001,
};

export default config;
