import express from 'express';
import { searchRentalProperties, getLocationTrends } from '../controller/propertyController.js';

const router = express.Router();

// Route to search for rental properties
router.post('/rentals/search', searchRentalProperties);

// Route to get location trends for rentals
router.get('/locations/:city/rental-trends', getLocationTrends);

export default router;