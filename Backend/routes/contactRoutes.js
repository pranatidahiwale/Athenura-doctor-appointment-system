 import express from "express";
import { submitContactMessage, getContactMessages } from "../controllers/contactController.js"; // Adjust path to your controller if necessary

const router = express.Router();

// POST /api/contact - Submit a message
router.post("/", submitContactMessage);

// GET /api/contact - Fetch messages for dashboard
router.get("/", getContactMessages);

export default router;