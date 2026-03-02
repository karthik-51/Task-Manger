const Task = require("../models/task.model");

exports.create = (data, userId) =>
  Task.create({ ...data, user: userId });

exports.getAll = async (query, userId) => {
  const { page=1, limit=10, search, priority, completed } = query;

  const filter = {
    user: userId,
    ...(search && { title: { $regex: search, $options: "i" } }),
    ...(priority && { priority }),
    ...(completed !== undefined && { completed: completed === "true" })
  };

  const tasks = await Task.find(filter)
    .skip((page-1)*limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  const total = await Task.countDocuments(filter);

  return { total, page:Number(page), tasks };
};