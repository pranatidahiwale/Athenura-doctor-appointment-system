import PatientJourney from '../models/PatientJourney.js';
import PatientReview from '../models/PatientReview.js';

// Get all journeys
export const getJourneys = async (req, res) => {
  try {
    const journeys = await PatientJourney.find();
    res.status(200).json(journeys);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reviews
export const getReviews = async (req, res) => {
  try {
    const reviews = await PatientReview.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a single review (for the frontend "Share Your Story" form)
export const addReview = async (req, res) => {
  try {
    const { name, date, rating, text } = req.body;
    const newReview = new PatientReview({
      name,
      date: date || new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      rating: Number(rating) || 5,
      text,
    });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
