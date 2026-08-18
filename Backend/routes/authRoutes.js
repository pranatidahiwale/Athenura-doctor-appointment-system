 import express from "express";
import { 
  signupDoctor, 
  loginDoctor, 
  getDoctorProfile, 
  updateDoctorProfile 
} from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signupDoctor);
router.post("/login", loginDoctor);

// Protected Profile Routes
router.get("/profile", authMiddleware, getDoctorProfile);
router.put("/profile", authMiddleware, updateDoctorProfile);

export default router;