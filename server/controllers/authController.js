// const Employee = require('../models/Employee');

// // Hardcoded admin credentials
// const ADMIN_EMAIL = "admin@ems.com";
// const ADMIN_PASSWORD = "admin123";
// // 
// // Admin login
// exports.loginAdmin = (req, res) => {
//   const { email, password } = req.body;
//   if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
//     return res.json({ role: 'admin', message: 'Admin login successful' });
//   } else {
//     return res.status(401).json({ message: 'Invalid admin credential from s' });
//   }
// };

// // Employee login
// exports.loginEmployee = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const emp = await Employee.findOne({ email, password });
//     if (!emp) {
//       return res.status(401).json({ message: 'Invalid employee credentials' });
//     }
//     res.json({ role: 'employee', employeeId: emp._id, message: 'Employee login successful' });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };
