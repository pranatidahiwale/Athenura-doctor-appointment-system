 import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: {
    type: String,
    required: function () { return this.authProvider === "local"; }
  },
  email: { type: String, required: true, unique: true },
  clinicName: {
    type: String,
    required: function () { return this.authProvider === "local"; }
  },
  clinicAddress: {
    type: String,
    required: function () { return this.authProvider === "local"; }
  },
  medicalRegistrationNo: {
    type: String,
    unique: true,
    sparse: true,
    required: function () { return this.authProvider === "local"; }
  },
  password: {
    type: String,
    required: function () { return this.authProvider === "local"; }
  },
  specialization: { type: String, default: "" },
  years: { type: String, default: "" },
  fee: { type: String, default: "" },
  title: { type: String, default: "" },
  photo: { type: String, default: "" },

  // New fields for Google Sign-In
  authProvider: { type: String, enum: ["local", "google"], default: "local" },
  googleId: { type: String, default: null },
  isProfileComplete: { type: Boolean, default: true },

  schedule: {
    activeDays: { type: [String], default: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
    morningSession: {
      enabled: { type: Boolean, default: true },
      startTime: { type: String, default: "09:00 AM" },
      endTime: { type: String, default: "01:00 PM" }
    },
    eveningSession: {
      enabled: { type: Boolean, default: true },
      startTime: { type: String, default: "04:00 PM" },
      endTime: { type: String, default: "08:00 PM" }
    },
    slotDuration: { type: String, default: "30 Minutes" },
    bufferTime: { type: String, default: "10 Minutes" }
  }
}, { timestamps: true });

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;