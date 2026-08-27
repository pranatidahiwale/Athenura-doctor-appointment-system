import mongoose from 'mongoose';

const holidaySchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  status: { type: String, required: true },
  description: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Holiday', holidaySchema);
