import fs from "fs";
import imagekit from "../config/imagekit.js";
import Property from "../models/propertymodel.js";

const addproperty = async (req, res) => {
    try {
        console.log("📝 Adding new property...");
        console.log("Request body:", req.body);
        console.log("Request files:", req.files ? Object.keys(req.files) : 'No files');

        const { title, location, monthlyRent, beds, baths, sqft, type, availability, rentalType, description, amenities, phone } = req.body;

        // Validate required fields
        if (!title || !location || !monthlyRent || !type) {
            return res.status(400).json({
                message: "Missing required fields: title, location, monthlyRent, type",
                success: false
            });
        }

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);
        console.log(`📸 Found ${images.length} images to upload`);

        let imageUrls = [];

        if (images.length > 0) {
            try {
                // Upload images to ImageKit and delete after upload
                imageUrls = await Promise.all(
                    images.map(async (item, index) => {
                        try {
                            console.log(`📤 Uploading image ${index + 1}:`, item.originalname);
                            console.log(`📁 File path:`, item.path);
                            console.log(`📊 File size:`, item.size);

                            // Check if file exists
                            if (!fs.existsSync(item.path)) {
                                console.error(`❌ File not found: ${item.path}`);
                                return `https://via.placeholder.com/400x300?text=File+Not+Found`;
                            }

                            if (!imagekit || typeof imagekit.upload !== 'function') {
                                console.warn("⚠️ ImageKit not available, using placeholder");
                                return `https://via.placeholder.com/400x300?text=ImageKit+Unavailable`;
                            }

                            // Test ImageKit credentials
                            console.log("🔑 Testing ImageKit credentials...");

                            const fileBuffer = fs.readFileSync(item.path);
                            console.log(`📦 File buffer size: ${fileBuffer.length} bytes`);

                            const uploadOptions = {
                                file: fileBuffer,
                                fileName: `property_${Date.now()}_${Math.random().toString(36).substring(7)}_${item.originalname}`,
                                folder: "/Property",
                                useUniqueFileName: true,
                                tags: ["property", "website"]
                            };

                            console.log("🚀 Starting ImageKit upload...");
                            const result = await imagekit.upload(uploadOptions);

                            console.log(`✅ Image ${index + 1} uploaded successfully!`);
                            console.log(`🔗 URL: ${result.url}`);
                            console.log(`🆔 File ID: ${result.fileId}`);

                            // Clean up uploaded file
                            fs.unlink(item.path, (err) => {
                                if (err) console.log("⚠️ Error deleting temp file:", err);
                                else console.log("🗑️ Temp file deleted successfully");
                            });

                            return result.url;
                        } catch (uploadError) {
                            console.error(`❌ ImageKit upload failed for image ${index + 1}:`);
                            console.error("Error details:", uploadError.message);
                            console.error("Error code:", uploadError.code);
                            console.error("Full error:", uploadError);

                            // Clean up file even if upload failed
                            if (fs.existsSync(item.path)) {
                                fs.unlink(item.path, (err) => {
                                    if (err) console.log("Error deleting failed upload file:", err);
                                });
                            }

                            // Return a more descriptive placeholder
                            return `https://via.placeholder.com/400x300/ff6b6b/ffffff?text=Upload+Failed+${index + 1}`;
                        }
                    })
                );
                console.log("✅ All images processed successfully");
            } catch (error) {
                console.error("❌ Error in image upload process:", error);
                // Continue with placeholder images
                imageUrls = images.map((_, index) =>
                    `https://via.placeholder.com/400x300?text=Property+Image+${index + 1}`
                );
            }
        } else {
            console.log("📷 No images provided, using default placeholder");
            imageUrls = ["https://via.placeholder.com/400x300?text=No+Image"];
        }

        // Parse amenities if it's a string
        let parsedAmenities = amenities;
        if (typeof amenities === 'string') {
            try {
                parsedAmenities = JSON.parse(amenities);
            } catch (e) {
                parsedAmenities = amenities.split(',').map(a => a.trim());
            }
        }

        // Create a new rental property
        const product = new Property({
            title,
            location,
            monthlyRent: Number(monthlyRent),
            beds: Number(beds) || 0,
            baths: Number(baths) || 0,
            sqft: Number(sqft) || 0,
            type,
            availability: availability || 'Available',
            rentalType: rentalType || 'Monthly',
            description: description || '',
            amenities: parsedAmenities || [],
            image: imageUrls,
            phone: phone || ''
        });

        console.log("💾 Saving property to database...");
        await product.save();
        console.log("✅ Property saved successfully with ID:", product._id);

        res.json({
            message: "Rental property added successfully",
            success: true,
            propertyId: product._id
        });
    } catch (error) {
        console.error("❌ Error adding property:", error);
        res.status(500).json({
            message: error.message || "Server Error",
            success: false,
            error: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
};

const listproperty = async (req, res) => {
    try {
        const property = await Property.find();
        res.json({ property, success: true });
    } catch (error) {
        console.log("Error listing products: ", error);
        res.status(500).json({ message: "Server Error", success: false });
    }
};

const removeproperty = async (req, res) => {
    try {
        const property = await Property.findByIdAndDelete(req.body.id);
        if (!property) {
            return res.status(404).json({ message: "Property not found", success: false });
        }
        return res.json({ message: "Property removed successfully", success: true });
    } catch (error) {
        console.log("Error removing product: ", error);
        return res.status(500).json({ message: "Server Error", success: false });
    }
};

const updateproperty = async (req, res) => {
    try {
        const { id, title, location, monthlyRent, beds, baths, sqft, type, availability, rentalType, description, amenities, phone } = req.body;

        const property = await Property.findById(id);
        if (!property) {
            console.log("Property not found with ID:", id); // Debugging line
            return res.status(404).json({ message: "Property not found", success: false });
        }

        if (!req.files) {
            // No new images provided
            property.title = title;
            property.location = location;
            property.monthlyRent = monthlyRent;
            property.beds = beds;
            property.baths = baths;
            property.sqft = sqft;
            property.type = type;
            property.availability = availability;
            property.rentalType = rentalType;
            property.description = description;
            property.amenities = amenities;
            property.phone = phone;
            // Keep existing images
            await property.save();
            return res.json({ message: "Property updated successfully", success: true });
        }

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

        // Upload images to ImageKit and delete after upload
        const imageUrls = await Promise.all(
            images.map(async (item) => {
                const result = await imagekit.upload({
                    file: fs.readFileSync(item.path),
                    fileName: item.originalname,
                    folder: "Property",
                });
                fs.unlink(item.path, (err) => {
                    if (err) console.log("Error deleting the file: ", err);
                });
                return result.url;
            })
        );

        property.title = title;
        property.location = location;
        property.monthlyRent = monthlyRent;
        property.beds = beds;
        property.baths = baths;
        property.sqft = sqft;
        property.type = type;
        property.availability = availability;
        property.rentalType = rentalType;
        property.description = description;
        property.amenities = amenities;
        property.image = imageUrls;
        property.phone = phone;

        await property.save();
        res.json({ message: "Property updated successfully", success: true });
    } catch (error) {
        console.log("Error updating product: ", error);
        res.status(500).json({ message: "Server Error", success: false });
    }
};

const singleproperty = async (req, res) => {
    try {
        const { id } = req.params;
        const property = await Property.findById(id);
        if (!property) {
            return res.status(404).json({ message: "Property not found", success: false });
        }
        res.json({ property, success: true });
    } catch (error) {
        console.log("Error fetching property:", error);
        res.status(500).json({ message: "Server Error", success: false });
    }
};

export { addproperty, listproperty, removeproperty, updateproperty , singleproperty};