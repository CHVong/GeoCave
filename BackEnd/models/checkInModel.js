const mongoose = require("mongoose");

const checkInSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    currentWorkload: {
      type: String,
      require: true,
    },
    happyHours: {
      type: String,
      required: true,
    },
    hoursLastWeek: {
      type: String,
      required: true,
    },
    hoursThisWeek: {
      type: String,
      required: true,
    },
    needBreak: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    weeksOutForFieldWorkNonLocal: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("checkInModel", checkInSchema, "checkInCollection");
