 import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  clinicName: { type: String, required: true },
  clinicAddress: { type: String, required: true },
  medicalRegistrationNo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const Doctor = mongoose.model("Doctor", doctorSchema);
export default Doctor;