 import express from "express";
import { signupDoctor, loginDoctor } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signupDoctor);
router.post("/login", loginDoctor);

export default router;