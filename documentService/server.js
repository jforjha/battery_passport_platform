// documentService/server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const routes = require('./src/routes');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4002;

// Middleware
app.use(cors());
app.use(express.json());

// Static file serving for uploaded documents
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/documents', routes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Document Service connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Document Service running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('MongoDB connection error:', err);
});
