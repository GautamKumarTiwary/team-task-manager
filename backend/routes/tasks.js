const express = require('express');
const Task = require('../models/Task');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/tasks
// @desc    Create a task
// @access  Admin
router.post('/', protect, admin, async (req, res) => {
  const { title, description, project, assignedTo, dueDate } = req.body;
  try {
    const task = new Task({
      title,
      description,
      project,
      assignedTo: assignedTo || null,
      dueDate,
    });
    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/tasks/project/:projectId
// @desc    Get tasks by project
// @access  Private
router.get('/project/:projectId', protect, async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId }).populate('assignedTo', 'name email');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/tasks/user
// @desc    Get tasks assigned to the logged in user
// @access  Private
router.get('/user', protect, async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user._id }).populate('project', 'name');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/tasks/:id/status
// @desc    Update task status
// @access  Private
router.put('/:id/status', protect, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    task.status = req.body.status || task.status;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
