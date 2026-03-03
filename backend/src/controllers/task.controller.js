const taskService = require("../services/task.service");

// CREATE TASK
exports.create = async (req, res, next) => {
  try {
    const task = await taskService.create(req.body, req.user.id);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

// GET ALL TASKS (with filters, pagination)
exports.getAll = async (req, res, next) => {
  try {
    const result = await taskService.getAll(req.query, req.user.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// GET SINGLE TASK
exports.getOne = async (req, res, next) => {
  try {
    const task = await taskService.getOne(req.params.id, req.user.id);
    res.json(task);
  } catch (err) {
    next(err);
  }
};

// UPDATE TASK
exports.update = async (req, res, next) => {
  try {
    const updatedTask = await taskService.update(
      req.params.id,
      req.body,
      req.user.id
    );
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
};

// DELETE TASK
exports.remove = async (req, res, next) => {
  try {
    await taskService.remove(req.params.id, req.user.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// CHANGE STATUS (Workflow-specific endpoint)
exports.changeStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const task = await taskService.changeStatus(
      req.params.id,
      status,
      req.user.id
    );

    res.json(task);
  } catch (err) {
    next(err);
  }
};