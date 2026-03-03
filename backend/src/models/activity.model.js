const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },

    action: String, // created, updated, status_changed, etc.

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    meta: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);