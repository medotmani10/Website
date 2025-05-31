import express from 'express';
import imagekit from '../config/imagekit.js';

const testRouter = express.Router();

// Test ImageKit connection
testRouter.get('/imagekit', async (req, res) => {
    try {
        console.log("🧪 Testing ImageKit connection...");
        
        if (!imagekit) {
            return res.json({
                success: false,
                message: "ImageKit not initialized",
                details: "ImageKit instance is null"
            });
        }

        if (typeof imagekit.upload !== 'function') {
            return res.json({
                success: false,
                message: "ImageKit upload function not available",
                details: "Upload method is not a function"
            });
        }

        // Test with a simple base64 image
        const testImageBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
        
        const result = await imagekit.upload({
            file: testImageBase64,
            fileName: `test_${Date.now()}.png`,
            folder: "/Property/test"
        });

        console.log("✅ ImageKit test successful:", result.url);

        res.json({
            success: true,
            message: "ImageKit connection successful",
            testImageUrl: result.url,
            fileId: result.fileId
        });

    } catch (error) {
        console.error("❌ ImageKit test failed:", error);
        
        res.json({
            success: false,
            message: "ImageKit test failed",
            error: error.message,
            code: error.code,
            details: error.toString()
        });
    }
});

// Test environment variables
testRouter.get('/env', (req, res) => {
    res.json({
        imagekit: {
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY ? '✅ Set' : '❌ Missing',
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY ? '✅ Set' : '❌ Missing',
            urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT ? '✅ Set' : '❌ Missing',
            publicKeyPreview: process.env.IMAGEKIT_PUBLIC_KEY ? process.env.IMAGEKIT_PUBLIC_KEY.substring(0, 10) + '...' : 'Not set',
            urlEndpointValue: process.env.IMAGEKIT_URL_ENDPOINT || 'Not set'
        },
        other: {
            nodeEnv: process.env.NODE_ENV,
            port: process.env.PORT
        }
    });
});

export default testRouter;
