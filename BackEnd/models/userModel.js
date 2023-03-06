const mongoose = require("mongoose");
const { format } = require("date-fns");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [
    {
      type: String,
      default: "Employee",
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
  created: {
    type: Date,
    default: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
  },
});

module.exports = mongoose.model("userModel", userSchema);
