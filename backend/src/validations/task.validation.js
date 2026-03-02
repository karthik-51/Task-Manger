const Joi = require("joi");

exports.taskSchema = Joi.object({
  title: Joi.string().min(2).required(),
  description: Joi.string().allow(""),
  priority: Joi.string().valid("low", "medium", "high"),
  completed: Joi.boolean()
});