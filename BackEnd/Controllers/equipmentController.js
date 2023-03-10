const equipmentModel = require("../models/equipmentModel");

module.exports = {
  getAllEquipment: async (req, res) => {
    try {
    } catch (err) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  createEquipment: async (req, res) => {
    try {
      const { name, image, cloudinaryId, description, location, stock, vendor, job } = req.body;
      if (!name || !description || !location) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const newEquipment = await equipmentModel.create({
        name,
        image,
        cloudinaryId,
        description,
        location,
        stock,
        vendor,
        job,
      });
      if (newEquipment) {
        return res.status(201).json({ message: "New equipment created" });
      } else {
        return res.status(400).json({ message: "Invalid equipment data received" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  updateEquipment: async (req, res) => {
    try {
      const { id, name, image, cloudinaryId, description, location, stock, vendor, job } = req.body;
      if (!id || !name || !description || !location) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const equipment = await equipmentModel.findById(id).exec();
      if (!equipment) {
        return res.status(400).json({ message: "Equipment not found" });
      }
      equipment.name = name;
      equipment.image = image;
      equipment.cloudinaryId = cloudinaryId;
      equipment.description = description;
      equipment.location = location;
      equipment.stock = stock;
      equipment.vendor = vendor;
      equipment.job = job;

      const updatedEquipment = await equipment.save();
      res.json(`Equipment(${updatedEquipment.name}) has been saved`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  deleteEquipment: async (req, res) => {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "Equipment ID required" });
      }
      const equipment = await equipmentModel.findById(id).exec();
      if (!equipment) {
        return res.status(400).json({ message: "Equipment not found" });
      }
      const result = await equipment.deleteOne();
      res.json(`Equipment(${result.name}) has been deleted`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};
