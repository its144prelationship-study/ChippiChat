import userRouter from "./routes/user.routes";
import chatRouter from "./routes/chat.routes";
import messageRouter from "./routes/message.routes";
import { connectSocket } from "./configs/socket";

const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const mongoose = require("mongoose");
const connectDB = require("./configs/db");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const configPath = path.resolve(__dirname, "configs", "config.env");
dotenv.config({ path: configPath });
connectDB();

const app = express();
const server = connectSocket(app);

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "*",
  })
);

const userRoutes = require("./routes/user.routes");

const PORT = process.env.PORT || 5789;

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message", messageRouter);

process.on("unhandledRejection", (err, promise) => {
  server.close(process.exit(1));
});
