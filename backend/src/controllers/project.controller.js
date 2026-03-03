const projectService = require("../services/project.service");

exports.create = async (req, res, next) => {
  try {
    const project = await projectService.create(req.body, req.user.id);
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

exports.getAll = async (req, res, next) => {
  try {
    const projects = await projectService.getAll(req.user.id);
    res.json(projects);
  } catch (err) {
    next(err);
  }
};