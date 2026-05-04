const express = require('express');
const Project = require('../models/Project');
const { protect, admin } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/projects
// @desc    Create a project
// @access  Admin
router.post('/', protect, admin, async (req, res) => {
  const { name, description, members } = req.body;
  try {
    const project = new Project({
      name,
      description,
      owner: req.user._id,
      members: members || [],
    });
    const createdProject = await project.save();
    res.status(201).json(createdProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/projects
// @desc    Get projects based on user role
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    let projects;
    if (req.user.role === 'Admin') {
      projects = await Project.find({ owner: req.user._id }).populate('members', 'name email');
    } else {
      projects = await Project.find({ members: req.user._id }).populate('members', 'name email');
    }
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/projects/:id
// @desc    Get project by ID
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('members', 'name email');
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
