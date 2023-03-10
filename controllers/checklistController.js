const checklistModel = require("../models/checklistModel");

module.exports = {
  getChecklistItems: async (req, res) => {
    try {
      const { user, job } = req.body;
      const checklistItems = await checklistModel.find({ user, job }).lean();
      if (!checklistItems?.length) {
        return res.status(400).json({ message: "No checklist items found" });
      }
      res.json(checklistItems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  createChecklistItem: async (req, res) => {
    try {
      const { user, job, item } = req.body;
      if (!user || !job || !item) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const checklistItem = await checklistModel.create({ user, job, item });
      if (checklistItem) {
        return res.status(201).json({ message: "New checklist item created" });
      } else {
        return res.status(400).json({ message: "Invalid checklist item data received" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  updateChecklistItem: async (req, res) => {
    try {
      const { id, user, item, job } = req.body;
      if (!id || !user || !item || !job) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const checklistItems = await checklistModel.findById(id).exec();
      if (!checklistItems) {
        return res.status(400).json({ message: "No checklist items found" });
      }

      checklistItems.item = item;

      const updatedChecklistItem = await checklistItems.save();

      res.json(`'${updatedChecklistItem.job}' updated`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  deleteChecklistItem: async (req, res) => {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ message: "Checklist ID required" });
      }
      const checklistItem = await checklistModel.findById(id).exec();
      if (!checklistItem) {
        return res.status(400).json({ message: "Checklist item not found" });
      }
      const result = await checklistItem.deleteOne();
      res.json(`${result.job} item has been deleted`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};
