import express from "express";
import authRoutes from "./routes/auth.route.js"; // ESM import path
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
const app = express();
dotenv.config();

const PORT = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true,
}));
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
