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

    const newAppointment = new Appointment({
      fullName,
      phoneNumber,
      emailAddress,
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