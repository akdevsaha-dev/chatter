import express from "express"; // Correct ESM import
import { protectRoute } from "../middleware/protectRoute.js";
import { checkAuth, logout, signin, signup, updateProfile, } from "../controllers/auth.controller.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", protectRoute, logout);
router.get("/check", protectRoute, checkAuth);
router.put("/update-profile", protectRoute, updateProfile);
export default router; // Correct ESM export
