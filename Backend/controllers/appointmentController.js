 import Appointment from '../models/Appointment.js';

// @desc    Book a new appointment (Client side - No Auth)
// @route   POST /api/appointments/book
export const bookAppointment = async (req, res) => {
  try {
    const { 
      fullName, 
      phoneNumber, 
      emailAddress, 
      age, 
      gender, 
      preferredDate, 
      preferredTime, 
      reasonForVisit, 
      additionalNotes 
    } = req.body;

    // Validate required fields
    if (!fullName || !phoneNumber || !emailAddress || !age || !gender || !preferredDate || !preferredTime || !reasonForVisit) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill out all required fields.' 
      });
    }

    // Check if an active appointment already exists for this email or phone number
    const existingAppointment = await Appointment.findOne({
      $or: [
        { emailAddress: emailAddress.toLowerCase().trim() },
        { phoneNumber: phoneNumber.trim() }
      ],
      status: { $ne: 'Cancelled' } // Allow booking if their previous appointment was cancelled
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: 'You already have an active appointment.'
      });
    }

    const newAppointment = new Appointment({
      fullName,
      phoneNumber: phoneNumber.trim(),
      emailAddress: emailAddress.toLowerCase().trim(),
      age,
      gender,
      preferredDate,
      preferredTime,
      reasonForVisit,
      additionalNotes,
      status: 'Pending'
    });

    const savedAppointment = await newAppointment.save();

    res.status(201).json({ 
      success: true, 
      message: 'Appointment booked successfully!', 
      data: savedAppointment 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// @desc    Get all appointments (For Doctor Dashboard)
// @route   GET /api/appointments
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.status(200).json({ 
      success: true, 
      count: appointments.length,
      data: appointments 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};

// @desc    Get a single appointment by ID (For checking status via Reference ID)
// @route   GET /api/appointments/:id
export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc    Update appointment status (Approve, Reject, Reschedule, etc.)
// @route   PUT /api/appointments/:id/status
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, preferredDate, preferredTime } = req.body;

    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found',
      });
    }

    if (status) appointment.status = status;
    if (preferredDate) appointment.preferredDate = preferredDate;
    if (preferredTime) appointment.preferredTime = preferredTime;

    const updatedAppointment = await appointment.save();

    res.status(200).json({
      success: true,
      message: 'Appointment updated successfully',
      data: updatedAppointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};