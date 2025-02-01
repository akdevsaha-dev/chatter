import express from "express"; // Correct ESM import
import {
  logout,
  signin,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);
export default router; // Correct ESM export
