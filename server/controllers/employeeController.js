// const Employee = require('../models/Employee');

// exports.addEmployee = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const newEmp = new Employee({ name, email, password });
//     await newEmp.save();
//     res.json(newEmp);
//   } catch (err) {
//     res.status(500).json({ message: 'Error adding employee' });
//   }
// };

// exports.deleteEmployee = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Employee.findByIdAndDelete(id);
//     res.json({ message: 'Employee deleted' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting employee' });
//   }
// };

// exports.getAllEmployees = async (req, res) => {
//   try {
//     const employees = await Employee.find();
//     res.json(employees);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching employees' });
//   }
// };
