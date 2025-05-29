const express = require('express');
const bcrypt = require('bcryptjs');
const Employee = require('../models/Employee');

const router = express.Router();

const ADMIN_EMAIL = 'admin@example.com';
const ADMIN_PASSWORD = 'admin123'; // hardcoded admin password

// Admin login check (hardcoded)
router.post('/admin/login', (req, res) => {
  const { email, password } = req.body;
  if(email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return res.json({ success: true, role: 'admin' });
  }
  res.status(401).json({ success: false, message: 'Invalid admin credentials' });
});

// Employee login
router.post('/employee/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const employee = await Employee.findOne({ email });
    if(!employee) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, employee.password);
    if(!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    return res.json({ success: true, role: 'employee', employeeId: employee._id });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Add employee (admin only)
router.post('/employee', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existing = await Employee.findOne({ email });
    if(existing) return res.status(400).json({ success: false, message: 'Employee already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = new Employee({ email, password: hashedPassword });
    await employee.save();

    res.json({ success: true, employee });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete employee (admin only)
router.delete('/employee/:id', async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get all employees
router.get('/employees', async (req, res) => {
  try {
    const employees = await Employee.find({}, '-password'); // exclude passwords
    res.json({ success: true, employees });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


module.exports = router;
