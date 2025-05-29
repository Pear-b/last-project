const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // will be hashed
});

module.exports = mongoose.model('Employee', EmployeeSchema);
