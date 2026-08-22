import express from 'express';
import { 
  bookAppointment, 
  getAppointments,
  updateAppointmentStatus
} from '../controllers/appointmentController.js';

const router = express.Router();

// POST route for client booking
router.post('/book', bookAppointment);

// GET route for fetching appointments (doctor view)
router.get('/', getAppointments);

// PUT route for updating status
router.put('/:id/status', updateAppointmentStatus);

export default router;