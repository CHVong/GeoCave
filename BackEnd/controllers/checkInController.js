const checkInModel = require("../models/checkInModel");

module.exports = {
  getCheckInItems: async (req, res) => {
    try {
      const { user } = req.body;
      const checkInItems = await checkInModel.find().sort({ updatedAt: -1 }).lean();
      if (!checkInItems?.length) {
        return res.status(400).json({ message: "No checklist items found" });
      }
      res.json(checkInItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getCheckInCount: async (req, res) => {
    try {
      const count = await checkInModel.countDocuments();
      if (count === 0) {
        return res.status(400).json({ message: "No check-ins found" });
      }
      res.json({ count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  createCheckInItem: async (req, res) => {
    try {
      const {
        user,
        currentWorkload,
        happyHours,
        hoursLastWeek,
        hoursThisWeek,
        needBreak,
        summary,
        weeksOutForFieldWorkNonLocal,
      } = req.body;
      if (
        !user ||
        !currentWorkload ||
        !happyHours ||
        !hoursLastWeek ||
        !hoursThisWeek ||
        !needBreak ||
        !summary ||
        !weeksOutForFieldWorkNonLocal
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const checkInItem = await checkInModel.create({
        user,
        currentWorkload,
        happyHours,
        hoursLastWeek,
        hoursThisWeek,
        needBreak,
        summary,
        weeksOutForFieldWorkNonLocal,
      });
      if (checkInItem) {
        return res.status(201).json({ message: "New check in item created" });
      } else {
        return res.status(400).json({ message: "Invalid check in item data received" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  deleteCheckInItem: async (req, res) => {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Check-In ID required" });
      }
      const checkin = await checkInModel.findById(id).exec();
      if (!checkin) {
        return res.status(400).json({ message: "Check-In not found" });
      }

      const result = await checkin.deleteOne();
      res.json({
        message: `Safety incident (${result.name}) has been deleted`,
        deletedCheckIn: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};
