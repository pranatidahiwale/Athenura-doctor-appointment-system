 import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  emailAddress: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  preferredDate: { type: String, required: true },
  preferredTime: { type: String, required: true },
  reasonForVisit: { type: String, required: true },
  additionalNotes: { type: String },
  status: { 
    type: String, 
    enum: ['Pending', 'Confirmed', 'Cancelled', 'Approved', 'Rejected', 'Rescheduled'], 
    default: 'Pending' 
  }
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;