const express = require('express');
const Task = require('../models/Task');

const router = express.Router();

// Create task (admin only)
router.post('/', async (req, res) => {
  const { title, description, assignedTo } = req.body;
  try {
    const task = new Task({ title, description, assignedTo });
    await task.save();
    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get all tasks (optionally by employee)
router.get('/', async (req, res) => {
  const { employeeId } = req.query;
  try {
    let tasks;
    if(employeeId) {
      tasks = await Task.find({ assignedTo: employeeId }).populate('assignedTo', 'email');
    } else {
      tasks = await Task.find().populate('assignedTo', 'email');
    }
    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Mark task completed (employee)
router.patch('/:id/complete', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if(!task) return res.status(404).json({ success: false, message: 'Task not found' });

    task.completed = true;
    await task.save();

    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Delete task (admin)
router.delete('/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get tasks assigned to a specific employee
router.get("/employee/:employeeId", async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.employeeId }).populate("assignedTo", "email");
    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Mark task as complete
router.put("/:taskId/complete", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }
    task.completed = true;
    await task.save();
    res.json({ success: true, message: "Task marked as completed" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
