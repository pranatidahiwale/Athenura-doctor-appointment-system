import express from 'express';
import { getJourneys, getReviews, addReview } from '../controllers/testimonialController.js';

const router = express.Router();

router.get('/journeys', getJourneys);
router.get('/reviews', getReviews);
router.post('/reviews', addReview);

export default router;
