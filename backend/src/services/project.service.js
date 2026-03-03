const Project = require("../models/project.model");

exports.create = async (data, userId) => {
  return await Project.create({
    ...data,
    createdBy: userId,
  });
};

exports.getAll = async (userId) => {
  return await Project.find({ createdBy: userId }).sort({ createdAt: -1 });
};