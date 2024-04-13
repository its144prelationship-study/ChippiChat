import userRouter from "./routes/user.routes";

const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("./configs/db");
const cookieParser = require("cookie-parser");

const configPath = path.resolve(__dirname, "configs", "config.env");
dotenv.config({ path: configPath });
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

const userRoutes = require("./routes/user.routes");

const PORT = process.env.PORT || 5789;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

app.use("/api/user", userRouter);

process.on("unhandledRejection", (err, promise) => {
  server.close(process.exit(1));
});
