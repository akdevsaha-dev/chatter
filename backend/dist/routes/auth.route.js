import express from "express"; // Correct ESM import
import { checkAuth, logout, signin, signup, updateProfile, } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth);
export default router; // Correct ESM export
