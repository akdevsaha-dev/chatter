import express from "express"; // Correct ESM import
import { logout, signin, signup } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", logout);

export default router; // Correct ESM export
