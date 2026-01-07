const express = require('express');
const mongoose = require('mongoose');
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// @route   GET /api/tasks
// @desc    Get all tasks for logged in user
// @access  Private
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id })
      .sort({ createdDate: -1 })
      .select('-__v');

    res.json({
      tasks: tasks.map(task => ({
        id: task._id.toString(),
        title: task.title,
        description: task.description,
        createdDate: task.createdDate.toISOString(),
      })),
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description required' });
    }

    const task = await Task.create({
      title,
      description,
      userId: req.user._id,
    });

    res.status(201).json({
      task: {
        id: task._id.toString(),
        title: task.title,
        description: task.description,
        createdDate: task.createdDate.toISOString(),
      },
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    console.log('Update task request:', { id, title, description, userId: req.user._id });

    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description required' });
    }

    // Check if it's a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        error: 'Invalid task ID. This might be an old task. Please refresh the page to load tasks from database.' 
      });
    }

    const task = await Task.findOne({ _id: id, userId: req.user._id });

    if (!task) {
      console.log('Task not found:', { id, userId: req.user._id });
      return res.status(404).json({ error: 'Task not found' });
    }

    task.title = title;
    task.description = description;
    await task.save();

    res.json({
      task: {
        id: task._id.toString(),
        title: task.title,
        description: task.description,
        createdDate: task.createdDate.toISOString(),
      },
    });
  } catch (error) {
    console.error('Update task error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    console.log('Delete task request:', { id, userId: req.user._id });

    // Check if it's a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ 
        error: 'Invalid task ID. This might be an old task. Please refresh the page to load tasks from database.' 
      });
    }

    const task = await Task.findOneAndDelete({ _id: id, userId: req.user._id });

    if (!task) {
      console.log('Task not found for deletion:', { id, userId: req.user._id });
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Delete task error:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

