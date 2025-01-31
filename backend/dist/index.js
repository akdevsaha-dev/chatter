import express from "express";
import authRoutes from "./routes/auth.route.js"; // ESM import path
const app = express();
app.use("/api/auth", authRoutes);
app.listen(3000, () => console.log("Server is running on port number 3000"));
