 import express from "express";
import { 
  signupDoctor, 
  loginDoctor, 
  getDoctorProfile, 
  updateDoctorProfile,
  getPublicSchedule,
  googleLogin
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();




router.post("/signup", signupDoctor);
router.post("/login", loginDoctor);
router.post("/google-login", googleLogin);

// Public Schedule Route (No Auth)
router.get("/public-schedule", getPublicSchedule);

// Protected Profile Routes
router.get("/profile", authMiddleware, getDoctorProfile);
router.put("/profile", authMiddleware, updateDoctorProfile);

export default router;