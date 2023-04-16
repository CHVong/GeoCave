const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    stock: {
      type: String,
      default: "",
    },
    vendor: {
      type: String,
      default: "",
    },
    job: [
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

module.exports = mongoose.model("equipmentModel", equipmentSchema, "equipmentCollection");
