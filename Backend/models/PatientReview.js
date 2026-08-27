import mongoose from 'mongoose';

const patientReviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  rating: { type: Number, required: true },
  text: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('PatientReview', patientReviewSchema);
