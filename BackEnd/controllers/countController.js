const userModel = require("../models/userModel");
const safetyModel = require("../models/safetyModel");
const checkInModel = require("../models/checkInModel");
const equipmentModel = require("../models/equipmentModel");

module.exports = {
  getAllCounts: async (req, res) => {
    try {
      const userCount = await userModel.countDocuments();
      const safetyCount = await safetyModel.countDocuments();
      const checkInCount = await checkInModel.countDocuments();
      const equipmentCount = await equipmentModel.countDocuments();

      const counts = [userCount, safetyCount, checkInCount, equipmentCount];

      if (counts.some((c) => typeof c === "undefined" || c === null || c === "")) {
        return res.status(400).json({ message: "Some counts are returning an error" });
      }

      res.json({ userCount, safetyCount, checkInCount, equipmentCount });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};
