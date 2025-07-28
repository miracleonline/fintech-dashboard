const express = require('express'); 
const app = express(); 
const dotenv = require('dotenv'); 
const cors = require('cors');
const connectDB = require('./config/db.js'); 
const authRoutes = require('./routes/authRoutes'); 
const dashboardRoutes = require('./routes/dashboardRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { swaggerUi, swaggerSpec } = require('./swagger'); 
const profileRoutes = require('./routes/profileRoutes'); 




// Load environment variables 
dotenv.config(); 
// Connect DB first 
connectDB(); 
app.use(cors());
// Middleware to parse JSON 
app.use(express.json()); 


// App routes
app.use('/api/auth', authRoutes);
app.use('/api', dashboardRoutes); 
app.use('/api/transaction', transactionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/video', profileRoutes); 
app.use('/uploads', express.static('uploads'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;