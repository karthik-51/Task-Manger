const taskService = require("../services/task.service");

exports.create = async (req, res, next) => {
  try {
    const task = await taskService.create(req.body, req.user.id);
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const result = await taskService.getAll(req.query, req.user.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
};