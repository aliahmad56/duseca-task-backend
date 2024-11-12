const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },

  role: {
    type: String,
    default: 'user'
  },

  password: {
    type: String,
    required: true
  },

  managerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Manager'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
