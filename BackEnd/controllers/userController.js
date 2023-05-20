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
  createNewUser: async (req, res) => {
    try {
      const { username, password, roles } = req.body;
      if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const duplicate = await userModel.findOne({ username }).lean().exec();
      if (duplicate) {
        return res
          .status(409)
          .json({ message: "Cannot create a new user with duplicate username" });
      }
      const hasedPassword = await bcrypt.hash(password, 10);
      const userObject = { username, password: hasedPassword, roles };
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
  updateRole: async (req, res) => {
    try {
      const { id, role } = req.body;

      if (role.trim() === "") {
        // Check if the trimmed role is empty
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
};
