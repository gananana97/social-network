const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config(); 

// Import routes
const userRoutes = require('./routes/userRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { // Ensure the variable name matches your .env file
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected');
  // Start the server after successful connection
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);
