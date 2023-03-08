const mongoose = require("mongoose");
// const { format } = require("date-fns");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      min: 4,
      max: 25,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
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
    // createdDate: {
    //   type: Date,
    //   default: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userModel", userSchema);
