const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5789;

const server = app.listen(
  PORT
);

process.on("unhandledRejection", (err, promise) => {
  server.close(process.exit(1));
});
