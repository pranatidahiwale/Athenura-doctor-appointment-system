import express from 'express';
import { 
  bookAppointment, 
  getAppointments 
} from '../controllers/appointmentController.js';

const router = express.Router();

// POST route for client booking
router.post('/book', bookAppointment);

// GET route for fetching appointments (doctor view)
router.get('/', getAppointments);

export default router;