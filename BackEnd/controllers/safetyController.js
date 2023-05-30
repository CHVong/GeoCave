const safetyModel = require("../models/safetyModel");
const cloudinary = require("../middlewares/cloudinary");

module.exports = {
  getAllSafety: async (req, res) => {
    try {
      const safety = await safetyModel.find().sort({ updatedAt: -1 }).lean();
      if (!safety?.length) {
        return res.status(400).json({ message: "No safety incident found" });
      }
      res.json(safety);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getSafetyCount: async (req, res) => {
    try {
      const count = await safetyModel.countDocuments();
      if (count === 0) {
        return res.status(400).json({ message: "No safety incidents found" });
      }
      res.json({ count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getLatestSafety: async (req, res) => {
    try {
      const safety = await safetyModel.find().sort({ updatedAt: -1 }).limit(1).lean();
      if (!safety?.length) {
        return res.status(400).json({ message: "No safety incident found" });
      }
      res.json(safety);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  createSafety: async (req, res) => {
    try {
      let uploadedImage = {};
      if (req.file) {
        uploadedImage = await cloudinary.uploader.upload(req.file.path);
      }

      const {
        projectName,
        projectNumber,
        suggestiveAction,
        image,
        cloudinaryId,
        description,
        hazards,
        user,
      } = req.body;
      if (!projectName || !projectNumber || !description || !suggestiveAction) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const newSafety = await safetyModel.create({
        projectName,
        projectNumber,
        image: uploadedImage.secure_url,
        cloudinaryId: uploadedImage.public_id,
        description,
        suggestiveAction,
        hazards,
        createdByUser: user,
      });
      if (newSafety) {
        return res.status(201).json({ message: "New safety incident created" });
      } else {
        return res.status(400).json({ message: "Invalid safety incident data received" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  updateSafety: async (req, res) => {
    try {
      const {
        projectName,
        projectNumber,
        suggestiveAction,
        image,
        cloudinaryId,
        description,
        hazards,
        user,
        id,
      } = req.body;
      if (!projectName || !projectNumber || !description || !suggestiveAction) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const safety = await safetyModel.findById(id).exec();
      if (!safety) {
        return res.status(400).json({ message: "Safety incident not found" });
      }
      safety.name = name;
      safety.image = image;
      safety.cloudinaryId = cloudinaryId;
      safety.description = description;
      safety.location = location;
      safety.stock = stock;
      safety.vendor = vendor;
      safety.job = job;

      const updatedSafety = await safety.save();
      res.json(`Safety incident (${updatedSafety.name}) has been saved`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  deleteSafety: async (req, res) => {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Safety ID required" });
      }
      const safety = await safetyModel.findById(id).exec();
      if (!safety) {
        return res.status(400).json({ message: "Safety incident not found" });
      }

      if (safety.cloudinaryId) {
        await cloudinary.uploader.destroy(safety.cloudinaryId);
      }
      const result = await safety.deleteOne();
      res.json({
        message: `Safety incident (${result.name}) has been deleted`,
        deletedSafety: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};
