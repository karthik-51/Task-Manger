const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: String,

    status: {
      type: String,
      enum: ["todo", "in-progress", "blocked", "review", "done"],
      default: "todo",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "critical"],
      default: "medium",
    },

    // 🆕 Feature 1: Project grouping
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },

    // 🆕 Feature 2: Categorization
    category: {
      type: String,
      enum: ["feature", "bug", "improvement", "research", "documentation"],
      default: "feature",
    },

    // 🆕 Feature 3: Environment (future-ready)
    environment: {
      type: String,
      enum: ["general", "dev", "staging", "prod"],
      default: "general",
    },

    // 🆕 Feature 4: Tags
    tags: [String],

    // 🆕 Feature 5: Task dependencies
    dependencies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],

    // 🆕 Feature 6: Due date
    dueDate: Date,

    // 🆕 Feature 7: Estimated time
    estimatedHours: Number,

    // 🆕 Feature 8: Assigned users
    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);