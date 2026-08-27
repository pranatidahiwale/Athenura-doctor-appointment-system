import mongoose from 'mongoose';

const milestoneSchema = new mongoose.Schema({
  week: { type: String, required: true },
  achievement: { type: String, required: true },
});

const patientJourneySchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  tag: { type: String, required: true },
  title: { type: String, required: true },
  patientName: { type: String, required: true },
  age: { type: Number, required: true },
  occupation: { type: String, required: true },
  icon: { type: String, required: true },
  image: { type: String },
  desc: { type: String, required: true },
  duration: { type: String, required: true },
  outcome: { type: String, required: true },
  background: { type: String, required: true },
  challenge: { type: String, required: true },
  treatmentPlan: [{ type: String }],
  milestones: [milestoneSchema],
  result: { type: String, required: true },
  careTeam: { type: String, required: true },
  quote: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('PatientJourney', patientJourneySchema);
