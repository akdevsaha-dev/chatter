import express from "express"; // Correct ESM import
import { logout, signin, signup } from "../controllers/auth.controller.js";
const router = express.Router();
router.get("/signup", signup);
router.get("/signin", signin);
router.get("/logout", logout);
export default router; // Correct ESM export
