// const Task = require('../models/Task');

// exports.assignTasks = async (req, res) => {
//   try {
//     const { title, description, dueDate, employeeIds } = req.body;
//     const tasks = await Promise.all(
//       employeeIds.map(empId => {
//         const newTask = new Task({ title, description, dueDate, assignedTo: empId });
//         return newTask.save();
//       })
//     );
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ message: 'Error assigning tasks' });
//   }
// };

// exports.getTasksForEmployee = async (req, res) => {
//   try {
//     const { empId } = req.params;
//     const tasks = await Task.find({ assignedTo: empId });
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching tasks' });
//   }
// };

// exports.markTaskCompleted = async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     await Task.findByIdAndUpdate(taskId, { status: 'completed' });
//     res.json({ message: 'Task marked as completed' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error marking task complete' });
//   }
// };

// exports.deleteTask = async (req, res) => {
//   try {
//     const { taskId } = req.params;
//     await Task.findByIdAndDelete(taskId);
//     res.json({ message: 'Task deleted' });
//   } catch (err) {
//     res.status(500).json({ message: 'Error deleting task' });
//   }
// };

// exports.getAllTasksWithStatus = async (req, res) => {
//   try {
//     const tasks = await Task.find().populate('assignedTo', 'name email');
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching tasks' });
//   }
// };
