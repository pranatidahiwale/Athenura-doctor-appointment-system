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

export const createService = async (req, res) => {
  try {
    const { title, shortDesc, image, overview, keyServices, duration, availability, avgRating, doctorsAvailable, consultationFee } = req.body;
    
    // Generate slug from title
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    const iconName = 'Heart'; // Default icon

    const newService = new Service({
      slug,
      iconName,
      title,
      shortDesc,
      image,
      overview,
      keyServices,
      duration,
      availability,
      avgRating: avgRating || 0,
      doctorsAvailable: doctorsAvailable || 0,
      consultationFee
    });

    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: 'Server error while creating service' });
  }
};

export const updateService = async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    console.error('Error updating service:', error);
    res.status(500).json({ message: 'Server error while updating service' });
  }
};

export const deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Server error while deleting service' });
  }
};
