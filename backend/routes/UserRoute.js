import express from 'express';
import cors from 'cors';
import { login, register, forgotpassword,adminlogin,resetpassword,getname } from '../controller/Usercontroller.js';
import authMiddleware from '../middleware/authmiddleware.js';


const userrouter = express.Router();


userrouter.post('/login', login);
userrouter.post('/register', register);
userrouter.post('/forgot', forgotpassword);
userrouter.post('/reset/:token', resetpassword);

// Specific CORS handling for admin login preflight requests
userrouter.options('/admin', cors()); // Enable preflight for this route
userrouter.post('/admin', cors(), adminlogin); // Apply CORS middleware to the POST request

export default userrouter;