const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');

const app = express();
// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies
app.use('/uploads', express.static('uploads'));
app.use('/api/users', userRoutes);

// MongoDB Connection String
const mongoURI = 'mongodb+srv://samyakkhetan58:TzWD1Y1ONAHIOeoh@form0.drmda.mongodb.net/?retryWrites=true&w=majority&appName=Form0';

// Connect to MongoDB using Promises
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');

    // Start the server only after successful DB connection
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
  });
