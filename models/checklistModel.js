const mongoose = require("mongoose");
// const { format } = require("date-fns");

const checklistSchema = new mongoose.Schema(
  {
    user: {
      // type: mongoose.Schema.Types.ObjectId,
      // required: true,
      // ref: "userModel",
      type: String,
      required: true,
    },
    item: {
      type: String,
      required: true,
    },
    job: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    // created: {
    //   type: Date,
    //   default: format(new Date(), "yyyy-MM-dd HH:mm:ss"),
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("checklistModel", checklistSchema, "checklistCollection");
