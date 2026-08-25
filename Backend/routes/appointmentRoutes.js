 import express from 'express';
import { 
  bookAppointment, 
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus
} from '../controllers/appointmentController.js';

const router = express.Router();

// POST route for client booking
router.post('/book', bookAppointment);

// GET route for fetching all appointments (doctor view)
router.get('/', getAppointments);

// GET route for fetching a single appointment by ID (for live status check)
router.get('/:id', getAppointmentById);

// PUT route for updating status
router.put('/:id/status', updateAppointmentStatus);

export default router;