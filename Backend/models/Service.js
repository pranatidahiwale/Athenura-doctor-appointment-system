import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  iconName: { type: String, required: true }, // The string name of the Lucide icon (e.g. 'Users', 'Heart')
  title: { type: String, required: true },
  shortDesc: { type: String, required: true },
  image: { type: String, required: true },
  overview: { type: String, required: true },
  keyServices: [{ type: String }],
  conditionsTreated: [{ type: String }],
  doctorsAvailable: { type: Number },
  avgRating: { type: Number },
  consultationFee: { type: String },
  duration: { type: String },
  availability: { type: String },
}, {
  timestamps: true
});

const Service = mongoose.model('Service', ServiceSchema);

export default Service;
