import firecrawlService from '../services/firecrawlService.js';
import aiService from '../services/aiService.js';

export const searchRentalProperties = async (req, res) => {
    try {
        const { city, maxRent, propertyCategory, propertyType, rentalType = 'Monthly', limit = 6 } = req.body;

        if (!city || !maxRent) {
            return res.status(400).json({ success: false, message: 'City and maxRent are required' });
        }

        // Extract rental property data using Firecrawl, specifying the limit
        const propertiesData = await firecrawlService.findRentalProperties(
            city,
            maxRent,
            propertyCategory || 'Residential',
            propertyType || 'Apartment',
            rentalType,
            Math.min(limit, 6) // Limit to max 6 properties
        );

        // Analyze the rental properties using AI
        const analysis = await aiService.analyzeRentalProperties(
            propertiesData.properties,
            city,
            maxRent,
            propertyCategory || 'Residential',
            propertyType || 'Apartment',
            rentalType
        );

        res.json({
            success: true,
            properties: propertiesData.properties,
            analysis
        });
    } catch (error) {
        console.error('Error searching rental properties:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to search rental properties',
            error: error.message
        });
    }
};

export const getLocationTrends = async (req, res) => {
    try {
        const { city } = req.params;
        const { limit = 5 } = req.query;

        if (!city) {
            return res.status(400).json({ success: false, message: 'City parameter is required' });
        }

        // Extract location trend data using Firecrawl, with limit
        const locationsData = await firecrawlService.getLocationTrends(city, Math.min(limit, 5));

        // Analyze the location trends using AI
        const analysis = await aiService.analyzeLocationTrends(
            locationsData.locations,
            city
        );

        res.json({
            success: true,
            locations: locationsData.locations,
            analysis
        });
    } catch (error) {
        console.error('Error getting location trends:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get location trends',
            error: error.message
        });
    }
};