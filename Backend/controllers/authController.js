 import bcrypt from "bcryptjs";
import Doctor from "../models/Doctor.js";

// Doctor Signup Controller
export const signupDoctor = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, clinicName, clinicAddress, medicalRegistrationNo, password } = req.body;

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ $or: [{ email }, { medicalRegistrationNo }] });
    if (existingDoctor) {
      return res.status(400).json({ message: "Doctor with this email or Medical Registration No. already exists." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save new doctor
    const newDoctor = new Doctor({
      fullName,
      phoneNumber,
      email,
      clinicName,
      clinicAddress,
      medicalRegistrationNo,
      password: hashedPassword,
    });

    await newDoctor.save();
    res.status(201).json({ message: "Doctor registered successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Doctor Login Controller
export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find doctor by email
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    res.status(200).json({
      message: "Login successful",
      doctor: {
        id: doctor._id,
        fullName: doctor.fullName,
        email: doctor.email,
        clinicName: doctor.clinicName,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};