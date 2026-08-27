import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Holiday from './models/Holiday.js';

dotenv.config();

export const clinicHolidaysData = [
  {
    name: "Maharashtra Day",
    date: "May 01, 2026",
    status: "Holiday",
    description: "State public holiday. Clinic remains closed."
  },
  {
    name: "Dr. Mehta's Leave",
    date: "June 15, 2026",
    status: "Leave",
    description: "Dr. Rajesh Mehta is on personal leave."
  },
  {
    name: "Independence Day",
    date: "August 15, 2026",
    status: "Holiday",
    description: "National holiday. All consultations are suspended."
  },
  {
    name: "Ganesh Chaturthi",
    date: "September 14, 2026",
    status: "Holiday",
    description: "Festival holiday. Clinic remains closed."
  },
  {
    name: "Diwali Holiday",
    date: "November 08, 2026",
    status: "Holiday",
    description: "Diwali festival celebration holiday."
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB");
    await Holiday.deleteMany({});
    
    await Holiday.insertMany(clinicHolidaysData);
    
    console.log("Holidays seeded successfully");
    process.exit(0);
  })
  .catch(err => {
    console.error("Error seeding holidays:", err);
    process.exit(1);
  });
