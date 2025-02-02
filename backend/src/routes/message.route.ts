import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/messages.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
