const Joi = require("joi");

/* =========================
   CREATE TASK SCHEMA
========================= */

exports.taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow(""),
  status: Joi.string().valid(
    "todo",
    "in-progress",
    "blocked",
    "review",
    "done"
  ),
  priority: Joi.string().valid(
    "low",
    "medium",
    "high",
    "critical"
  ),
  category: Joi.string().valid(
    "feature",
    "bug",
    "improvement",
    "research",
    "documentation"
  ),
  environment: Joi.string().valid(
    "general",
    "dev",
    "staging",
    "prod"
  ),
  project: Joi.string().optional(),
  tags: Joi.alternatives().try(
    Joi.string(),
    Joi.array().items(Joi.string())
  ),
  dependencies: Joi.array().items(Joi.string()),
  dueDate: Joi.date(),
  estimatedHours: Joi.number(),
  assignedTo: Joi.array().items(Joi.string())
});

/* =========================
   UPDATE TASK SCHEMA
========================= */

exports.updateTaskSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string().allow(""),
  status: Joi.string().valid(
    "todo",
    "in-progress",
    "blocked",
    "review",
    "done"
  ),
  priority: Joi.string().valid(
    "low",
    "medium",
    "high",
    "critical"
  ),
  category: Joi.string().valid(
    "feature",
    "bug",
    "improvement",
    "research",
    "documentation"
  ),
  environment: Joi.string().valid(
    "general",
    "dev",
    "staging",
    "prod"
  ),
  project: Joi.string(),
  tags: Joi.alternatives().try(
    Joi.string(),
    Joi.array().items(Joi.string())
  ),
  dependencies: Joi.array().items(Joi.string()),
  dueDate: Joi.date(),
  estimatedHours: Joi.number(),
  assignedTo: Joi.array().items(Joi.string())
});

/* =========================
   STATUS UPDATE SCHEMA
========================= */

exports.statusSchema = Joi.object({
  status: Joi.string()
    .valid("todo", "in-progress", "blocked", "review", "done")
    .required()
});