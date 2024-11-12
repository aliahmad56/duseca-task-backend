const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
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
    default: 'manager'
  },

  password: {
    type: String,
    required: true
  }
});

const Manager = mongoose.model('Manager', managerSchema);

module.exports = Manager;
