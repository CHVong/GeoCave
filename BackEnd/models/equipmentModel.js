const mongoose = require("mongoose");
const { format } = require("date-fns");

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
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
    type: mongoose.Schema.Types.Mixed,
    default: "Available",
  },
  vendor: {
    type: String,
  },
  job: [
    {
      type: String,
      default: "All",
    },
  ],
  created: {
    type: Date,
    default: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
});

module.exports = mongoose.model("equipmentModel", equipmentSchema);
