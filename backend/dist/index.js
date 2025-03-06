import express from "express";
import authRoutes from "./routes/auth.route.js"; // ESM import path
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./lib/db.js";
import { createServer } from "http";
dotenv.config();
const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 5001;
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
