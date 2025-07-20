const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connection Done"))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);

app.listen(5001, () => console.log("authService running on port 5001"));
