const userModel = require("../models/userModel");
const checklistModel = require("../models/checklistModel");
const bcrypt = require("bcrypt");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      const users = await userModel.find().select("-password").lean();
      if (!users?.length) {
        return res.status(400).json({ message: "No users found" });
      }
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getUsersCount: async (req, res) => {
    try {
      const count = await userModel.countDocuments();
      if (count === 0) {
        return res.status(400).json({ message: "No users found" });
      }
      res.json({ count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getSingleUser: async (req, res) => {
    const { username } = req.query;
    try {
      const user = await userModel.findOne({ username: username }).select("active").lean();
      if (!user) {
        return res.status(400).json({ message: "No users found" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  searchUsername: async (req, res) => {
    try {
      const { searchText } = req.query; // Get the search query from the request query parameters
      const searchRegex = new RegExp(searchText, "i"); // Create a regex pattern for case-insensitive search

      const user = await userModel
        .find({
          $or: [
            { username: searchRegex },
            { roles: { $in: [searchRegex] } }, // Use $in operator to search for an array of values
          ],
        })
        .sort({ updatedAt: -1 })
        .lean();

      if (!user?.length) {
        return res.status(400).json({ message: "No users found" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  createNewUser: async (req, res) => {
    try {
      const { username, password, roles } = req.body;
      if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "All fields are required" });
      }
      // const duplicate = await userModel.findOne({ username }).lean().exec();
      const duplicate = await userModel
        .findOne({ username: { $regex: new RegExp(`^${username}$`, "i") } })
        .lean()
        .exec();

      if (duplicate) {
        return res
          .status(409)
          .json({ message: "Cannot create a new user with duplicate username" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const userObject = {
        username,
        password: hashedPassword,
        roles,
        ip: req.headers["x-forwarded-for"] || req.connection.remoteAddress,
      };
      const newUser = await userModel.create(userObject);
      if (newUser) {
        res.status(201).json({ message: `New user (${username}) created` });
      } else res.status(400).json({ message: `Invalid user data received` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id, username, roles, active, password } = req.body;
      if (
        !id ||
        !username ||
        !Array.isArray(roles) ||
        !roles.length ||
        typeof active !== "boolean"
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const user = await userModel.findById(id).exec();
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const duplicate = await userModel.findOne({ username }).lean().exec();
      if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: "Cannot update: username already exists" });
      }

      user.username = username;
      user.roles = roles;
      user.active = active;

      if (password) {
        user.password = await bcrypt.hash(password, 10);
      }
      const updatedUser = await user.save();

      res.json({ message: `${updatedUser.username} updated` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ message: "User ID required" });
      }

      let user = await userModel.findById(id).exec();
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      await checklistModel.deleteMany({ user: id });
      await userModel.findByIdAndDelete(id);
      res.json({ message: `User(${user?.username}) has been deleted` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  addRole: async (req, res) => {
    try {
      const { id, role } = req.body;

      if (role.trim() === "") {
        // Check if the trimmed role is empty
        return;
      }

      if (role.trim().toLowerCase() === "admin" || role.trim().toLowerCase() === "manager") {
        return;
      }

      if (!id) {
        return res.status(400).json({ message: "User ID required" });
      }

      let user = await userModel.findById(id).exec();

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      if (user.roles.includes(role)) {
        return res.status(409).json({ message: "Role already assigned to the user" });
      }

      user.roles.push(role);
      await user.save();

      res.json({
        message: `Roles(${user?.username}) has been updated`,
        updatedResult: user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  updateRole: async (req, res) => {
    try {
      const { id, roles } = req.body;

      if (!id) {
        return res.status(400).json({ message: "User ID required" });
      }

      let user = await userModel.findById(id).exec();

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const updatedRoles = await userModel.findOneAndUpdate(
        { _id: id },
        {
          roles: roles,
        },
        { new: true }
      );

      res.json({
        message: `Roles(${user?.username}) has been updated`,
        updatedResult: updatedRoles,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  updateStatus: async (req, res) => {
    try {
      const { id, status } = req.body;

      if (!id) {
        return res.status(400).json({ message: "User ID required" });
      }

      let user = await userModel.findById(id).exec();

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const updatedStatus = await userModel.findOneAndUpdate(
        { _id: id },
        {
          active: status,
        },
        { new: true }
      );

      res.json({
        message: `Roles(${user?.username}) has been updated`,
        updatedResult: updatedStatus,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getRecentlyUpdated: async (req, res) => {
    try {
      const users = await userModel.find().sort({ updatedAt: -1 }).lean();
      if (!users?.length) {
        return res.status(400).json({ message: "No users found" });
      }
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getNameAZ: async (req, res) => {
    try {
      const users = await userModel
        .find()
        .collation({ locale: "en", strength: 1 })
        .sort({ username: 1 })
        .lean();
      if (!users?.length) {
        return res.status(400).json({ message: "No users found" });
      }
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getNameZA: async (req, res) => {
    try {
      const users = await userModel
        .find()
        .collation({ locale: "en", strength: 1 })
        .sort({ username: -1 })
        .lean();
      if (!users?.length) {
        return res.status(400).json({ message: "No users found" });
      }
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getNewest: async (req, res) => {
    try {
      const users = await userModel.find().sort({ createdAt: -1 }).lean();
      if (!users?.length) {
        return res.status(400).json({ message: "No user found" });
      }
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getOldest: async (req, res) => {
    try {
      const users = await userModel.find().sort({ createdAt: 1 }).lean();
      if (!users?.length) {
        return res.status(400).json({ message: "No users found" });
      }
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getActive: async (req, res) => {
    try {
      const users = await userModel.find().sort({ active: -1 }).lean();
      if (!users?.length) {
        return res.status(400).json({ message: "No users found" });
      }
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  getInactive: async (req, res) => {
    try {
      const users = await userModel.find().sort({ active: 1 }).lean();
      if (!users?.length) {
        return res.status(400).json({ message: "No users found" });
      }
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};
