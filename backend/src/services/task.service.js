const Task = require("../models/task.model");
const Project = require("../models/project.model");

/* =========================
   HELPER FUNCTIONS
========================= */

// Convert comma-separated tags into array
const parseTags = (tags) => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  if (typeof tags === "string") {
    return tags.split(",").map((tag) => tag.trim()).filter(Boolean);
  }
  return [];
};

// Validate project ownership
const validateProject = async (projectId, userId) => {
  if (!projectId) return;

  const project = await Project.findOne({
    _id: projectId,
    createdBy: userId,
  });

  if (!project) {
    throw new Error("Invalid project");
  }
};

// Validate dependencies belong to user
const validateDependencies = async (dependencies, userId) => {
  if (!dependencies || dependencies.length === 0) return;

  const count = await Task.countDocuments({
    _id: { $in: dependencies },
    user: userId,
  });

  if (count !== dependencies.length) {
    throw new Error("Invalid dependencies");
  }
};

/* =========================
   CREATE TASK
========================= */

exports.create = async (data, userId) => {
  data.tags = parseTags(data.tags);

  await validateProject(data.project, userId);
  await validateDependencies(data.dependencies, userId);

  const task = await Task.create({
    ...data,
    user: userId,
  });

  return task;
};

/* =========================
   GET ALL TASKS
========================= */

exports.getAll = async (query, userId) => {
  let {
    status,
    priority,
    category,
    project,
    environment,
    search,
    sortBy,
    page = 1,
    limit = 10,
  } = query;

  page = Number(page);
  limit = Number(limit);

  const filter = { user: userId };

  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (category) filter.category = category;
  if (project) filter.project = project;
  if (environment) filter.environment = environment;

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;

  const sortOptions = {
    newest: { createdAt: -1 },
    oldest: { createdAt: 1 },
    priority: { priority: -1 },
    dueDate: { dueDate: 1 },
  };

  const tasks = await Task.find(filter)
    .populate("project", "name color")
    .populate("dependencies", "title status")
    .populate("assignedTo", "name email")
    .sort(sortOptions[sortBy] || { createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Task.countDocuments(filter);

  return {
    total,
    page,
    pages: Math.ceil(total / limit),
    tasks,
  };
};

/* =========================
   GET SINGLE TASK
========================= */

exports.getOne = async (id, userId) => {
  const task = await Task.findOne({
    _id: id,
    user: userId,
  })
    .populate("project", "name color")
    .populate("dependencies", "title status")
    .populate("assignedTo", "name email");

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};

/* =========================
   UPDATE TASK
========================= */

exports.update = async (id, data, userId) => {
  const task = await Task.findOne({
    _id: id,
    user: userId,
  });

  if (!task) {
    throw new Error("Task not found");
  }

  if (data.tags !== undefined) {
    data.tags = parseTags(data.tags);
  }

  if (data.project) {
    await validateProject(data.project, userId);
  }

  if (data.dependencies) {
    await validateDependencies(data.dependencies, userId);
  }

  Object.assign(task, data);

  await task.save();

  return task;
};

/* =========================
   DELETE TASK
========================= */

exports.remove = async (id, userId) => {
  const task = await Task.findOneAndDelete({
    _id: id,
    user: userId,
  });

  if (!task) {
    throw new Error("Task not found");
  }

  return true;
};

/* =========================
   CHANGE STATUS
========================= */

exports.changeStatus = async (id, status, userId) => {
  const allowedStatuses = [
    "todo",
    "in-progress",
    "blocked",
    "review",
    "done",
  ];

  if (!allowedStatuses.includes(status)) {
    throw new Error("Invalid status");
  }

  const task = await Task.findOne({
    _id: id,
    user: userId,
  });

  if (!task) {
    throw new Error("Task not found");
  }

  task.status = status;
  await task.save();

  return task;
};