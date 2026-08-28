 import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Doctor from "../models/Doctor.js";
import admin from "../firebaseAdmin.js";

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

    // Generate JWT Token
    const token = jwt.sign(
      { id: doctor._id },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
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

// Get Doctor Profile Controller
export const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user.id).select("-password");
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Doctor Profile Controller
export const updateDoctorProfile = async (req, res) => {
  try {
    const updates = { ...req.body };
    
    // Prevent updating password through this route for security
    delete updates.password;

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    res.status(200).json({
      message: "Profile updated successfully!",
      doctor: updatedDoctor,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Public Schedule (For patient booking side)
export const getPublicSchedule = async (req, res) => {
  try {
    const { email, id } = req.query;
    let query = {};

    if (email) {
      query = { email };
    } else if (id) {
      query = { _id: id };
    }

    // Find the specific doctor or fallback to the latest doctor record
    const doctor = email || id 
      ? await Doctor.findOne(query).select("-password")
      : await Doctor.findOne().sort({ updatedAt: -1 }).select("-password");
    
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    res.status(200).json({ 
      doctorName: doctor.fullName,
      specialization: doctor.specialization || '',
      qualification: doctor.qualification || 'MBBS',
      experience: doctor.experience || '',
      clinicName: doctor.clinicName,
      clinicAddress: doctor.clinicAddress,
      schedule: doctor.schedule 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Google Sign-In Controller
export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "No ID token provided." });
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { email, name, uid } = decodedToken;

    // Check if doctor already exists
    let doctor = await Doctor.findOne({ email });

    if (!doctor) {
      // Create a partial account without initializing medicalRegistrationNo as null
      doctor = new Doctor({
        fullName: name || "Unnamed Doctor",
        email,
        authProvider: "google",
        googleId: uid,
        isProfileComplete: false,
      });
      await doctor.save();
    } else if (doctor.authProvider === "local") {
      // Existing local account with same email — link Google to it
      doctor.googleId = uid;
      await doctor.save();
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: doctor._id },
      process.env.JWT_SECRET || "your_jwt_secret",
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Google login successful",
      token,
      doctor: {
        id: doctor._id,
        fullName: doctor.fullName,
        email: doctor.email,
        clinicName: doctor.clinicName || "",
        isProfileComplete: doctor.isProfileComplete,
      },
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Google authentication failed", error: error.message });
  }
};
