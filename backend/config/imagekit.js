import ImageKit from 'imagekit';
import dotenv from 'dotenv';

dotenv.config();

// Default ImageKit credentials (fallback)
const defaultConfig = {
  publicKey: 'public_k04pXlcsbQGPv2oIoCW2X1Mbs3I=',
  privateKey: 'private_bHB8WV5ogj3ORrzyaEPIFM+u5JQ=',
  urlEndpoint: 'https://ik.imagekit.io/rmlpzvmnz/'
};

// Use environment variables or fallback to defaults
const imagekitConfig = {
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || defaultConfig.publicKey,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || defaultConfig.privateKey,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || defaultConfig.urlEndpoint,
};

let imagekit = null;

try {
  imagekit = new ImageKit(imagekitConfig);
  console.log("✅ ImageKit connected successfully!");
} catch (error) {
  console.error("❌ ImageKit initialization failed:", error.message);
  // Create a mock imagekit object to prevent crashes
  imagekit = {
    upload: () => Promise.reject(new Error('ImageKit not configured')),
    deleteFile: () => Promise.reject(new Error('ImageKit not configured'))
  };
}

export default imagekit;