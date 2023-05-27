const mongoose = require("mongoose");

const safetySchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
    },
    projectNumber: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    suggestiveAction: {
      type: String,
      required: true,
    },
    hazards: [
      {
        type: String,
        default: "",
      },
    ],
    image: {
      type: String,
      default: "",
    },
    cloudinaryId: {
      type: String,
      default: "",
    },
    createdByUser: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("safetyModel", safetySchema, "safetyCollection");
