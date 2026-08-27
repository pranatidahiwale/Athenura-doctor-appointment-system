import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import appointmentRoutes from './routes/appointmentRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

import holidayRoutes from './routes/holidayRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
// Change this:
// app.use("/api/auth", authRoutes);

// To this:
app.use("/api/doctors", authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/holidays', holidayRoutes);
app.use('/api/contact', contactRoutes);

// Database Connection & Server Start
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Database connection error:", err));