const equipmentModel = require("../models/equipmentModel");
const cloudinary = require("../middlewares/cloudinary");

module.exports = {
  getAllEquipment: async (req, res) => {
    try {
      const equipment = await equipmentModel.find().sort({ updatedAt: -1 }).lean();
      if (!equipment?.length) {
        return res.status(400).json({ message: "No equipment found" });
      }
      res.json(equipment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getSearchedEquipment: async (req, res) => {
    try {
      const { searchText } = req.query; // Get the search query from the request query parameters
      const searchRegex = new RegExp(searchText, "i"); // Create a regex pattern for case-insensitive search

      const equipment = await equipmentModel
        .find({
          $or: [
            { name: searchRegex },
            { description: searchRegex },
            { location: searchRegex },
            { stock: searchRegex },
            { vendor: searchRegex },
            { job: { $in: [searchRegex] } }, // Use $in operator to search for an array of values
            { createdByUser: searchRegex },
          ],
        })
        .sort({ updatedAt: -1 })
        .lean();

      if (!equipment?.length) {
        return res.status(400).json({ message: "No equipment found" });
      }
      res.json(equipment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getRecent: async (req, res) => {
    try {
      const equipment = await equipmentModel.find().sort({ updatedAt: -1 }).lean();
      if (!equipment?.length) {
        return res.status(400).json({ message: "No equipment found" });
      }
      res.json(equipment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getNameAZ: async (req, res) => {
    try {
      const equipment = await equipmentModel
        .find()
        .collation({ locale: "en", strength: 1 })
        .sort({ name: 1 })
        .lean();
      if (!equipment?.length) {
        return res.status(400).json({ message: "No equipment found" });
      }
      res.json(equipment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getNameZA: async (req, res) => {
    try {
      const equipment = await equipmentModel
        .find()
        .collation({ locale: "en", strength: 1 })
        .sort({ name: -1 })
        .lean();
      if (!equipment?.length) {
        return res.status(400).json({ message: "No equipment found" });
      }
      res.json(equipment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getStockHighToLow: async (req, res) => {
    try {
      const equipment = await equipmentModel.find().sort({ stock: -1 }).lean();
      if (!equipment?.length) {
        return res.status(400).json({ message: "No equipment found" });
      }
      equipment.sort((a, b) => b.stock - a.stock);
      res.json(equipment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getStockLowToHigh: async (req, res) => {
    try {
      const equipment = await equipmentModel.find().sort({ stock: 1 }).lean();
      if (!equipment?.length) {
        return res.status(400).json({ message: "No equipment found" });
      }
      equipment.sort((a, b) => a.stock - b.stock);
      res.json(equipment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getNewest: async (req, res) => {
    try {
      const equipment = await equipmentModel.find().sort({ createdAt: -1 }).lean();
      if (!equipment?.length) {
        return res.status(400).json({ message: "No equipment found" });
      }
      res.json(equipment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getOldest: async (req, res) => {
    try {
      const equipment = await equipmentModel.find().sort({ createdAt: 1 }).lean();
      if (!equipment?.length) {
        return res.status(400).json({ message: "No equipment found" });
      }
      res.json(equipment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  createEquipment: async (req, res) => {
    try {
      // console.log(req.body);
      console.log(req.file);
      // console.log(req.file.path);
      let uploadedImage = {};
      if (req.file) {
        uploadedImage = await cloudinary.uploader.upload(req.file.path);
      }

      const { name, image, cloudinaryId, description, location, stock, vendor, job, user } =
        req.body;
      if (!name || !description || !location || !stock) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const newEquipment = await equipmentModel.create({
        name,
        image: uploadedImage.secure_url,
        cloudinaryId: uploadedImage.public_id,
        description,
        location,
        stock,
        vendor,
        job,
        createdByUser: user,
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
  // updateEquipment: async (req, res) => {
  //   try {
  //     const { id, name, image, cloudinaryId, description, location, stock, vendor, job } = req.body;
  //     if (!id || !name || !description || !location) {
  //       return res.status(400).json({ message: "All fields are required" });
  //     }
  //     const equipment = await equipmentModel.findById(id).exec();
  //     if (!equipment) {
  //       return res.status(400).json({ message: "Equipment not found" });
  //     }
  //     equipment.name = name;
  //     equipment.image = image;
  //     equipment.cloudinaryId = cloudinaryId;
  //     equipment.description = description;
  //     equipment.location = location;
  //     equipment.stock = stock;
  //     equipment.vendor = vendor;
  //     equipment.job = job;

  //     const updatedEquipment = await equipment.save();
  //     res.json(`Equipment(${updatedEquipment.name}) has been saved`);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Server error" });
  //   }
  // },
  updateItem: async (req, res) => {
    try {
      const { id, fieldToUpdate, contentToUpdate } = req.body;

      if (contentToUpdate === "") {
        return;
      }

      if (!id || !fieldToUpdate || !contentToUpdate) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const equipment = await equipmentModel.findById(id).exec();
      if (!equipment) {
        return res.status(400).json({ message: "Equipment not found" });
      }

      const updatedEquipment = await equipmentModel.findOneAndUpdate(
        { _id: id },
        { [fieldToUpdate]: contentToUpdate }, //passing fieldToUpdate as a literal string, which is not interpreted as a variable. By wrapping fieldToUpdate in square brackets [fieldToUpdate], it will be interpreted as the value of the variable, and the corresponding field will be updated in the document.
        { new: true }
      );
      res.json(updatedEquipment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  updateStock: async (req, res) => {
    try {
      const { id, stock } = req.body;

      if (stock === "") {
        return;
      }

      if (!id || !stock) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const equipment = await equipmentModel.findById(id).exec();
      if (!equipment) {
        return res.status(400).json({ message: "Equipment not found" });
      }

      const updatedEquipment = await equipmentModel.findOneAndUpdate(
        { _id: id },
        { stock: stock },
        { new: true }
      );
      res.json(updatedEquipment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  updatePicture: async (req, res) => {
    console.log(req.file);

    try {
      if (!req.file) {
        return res.status(400).json({ message: "Picture data is required" });
      }

      const { id } = req.body;

      const uploadedImage = await cloudinary.uploader.upload(req.file.path);

      if (!id) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const equipment = await equipmentModel.findById(id);
      if (!equipment) {
        return res.status(404).json({ message: "Equipment not found" });
      }

      const updatedEquipment = await equipmentModel.findOneAndUpdate(
        { _id: id },
        {
          image: uploadedImage.secure_url,
          cloudinaryId: uploadedImage.public_id,
        },
        { new: true }
      );

      //check if item has an image to begin with then delete on cloudinary
      if (equipment.cloudinaryId) {
        await cloudinary.uploader.destroy(equipment.cloudinaryId);
      }
      res.json(updatedEquipment);
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

      if (equipment.cloudinaryId) {
        await cloudinary.uploader.destroy(equipment.cloudinaryId);
      }

      const result = await equipment.deleteOne();
      console.log(result);
      res.json({
        message: `Equipment (${equipment.name}) has been deleted`,
        deletedEquipment: result,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};
