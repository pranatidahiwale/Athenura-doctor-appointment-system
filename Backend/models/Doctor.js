 import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  clinicName: { type: String, required: true },
  clinicAddress: { type: String, required: true },
  medicalRegistrationNo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  specialization: { type: String, default: "" },
  years: { type: String, default: "" },
  fee: { type: String, default: "" },
  title: { type: String, default: "" },
  photo: { type: String, default: "" },

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