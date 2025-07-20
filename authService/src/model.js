const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LoggedUserSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is mandatory'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  }
}, {
  timestamps: true
});

const User = mongoose.model('User', LoggedUserSchema);

module.exports = User;
