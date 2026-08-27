import Service from '../models/Service.js';

export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Server error while fetching services' });
  }
};
