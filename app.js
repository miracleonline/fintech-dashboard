const express = require('express'); 
const app = express(); 
const dotenv = require('dotenv'); 
const connectDB = require('./config/db.js'); 
const authRoutes = require('./routes/authRoutes'); 


// Load environment variables 
dotenv.config(); 
// Connect DB first 
connectDB(); 
// Middleware to parse JSON 
app.use(express.json()); 


// App routes
app.use('/api/auth', authRoutes); 

module.exports = app;