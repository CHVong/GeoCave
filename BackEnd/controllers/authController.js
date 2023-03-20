const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // @desc Login
  // @route POST /auth
  // @access Public
  login: async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const foundUser = await User.findOne({ username }).exec();

      if (!foundUser || !foundUser.active) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const match = await bcrypt.compare(password, foundUser.password);

      if (!match) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: foundUser.username,
            roles: foundUser.roles,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      // Create secure cookie with refresh token
      res.cookie("jwt", refreshToken, {
        httpOnly: true, //accessible only by web server
        secure: true, //https
        sameSite: "None", //cross-site cookie
        maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
      });
      // const roles = foundUser.roles;
      // Send accessToken containing username and roles
      res.json({ /*roles,*/ accessToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  // @desc Refresh
  // @route GET /auth/refresh
  // @access Public - because access token has expired
  refresh: async (req, res) => {
    try {
      const cookies = req.cookies;

      if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

      const refreshToken = cookies.jwt;

      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
        try {
          if (err) return res.status(403).json({ message: "Forbidden" });

          const foundUser = await User.findOne({ username: decoded.username }).exec();

          if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

          const accessToken = jwt.sign(
            {
              UserInfo: {
                username: foundUser.username,
                roles: foundUser.roles,
              },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
          );
          // const roles = foundUser.roles;

          res.json({ /*roles,*/ accessToken });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: "Server error" });
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
  // @desc Logout
  // @route POST /auth/logout
  // @access Public - just to clear cookie if exists
  logout: async (req, res) => {
    try {
      const cookies = req.cookies;
      if (!cookies?.jwt) return res.sendStatus(204); //No content
      res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
      res.json({ message: "Cookie cleared" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  },
};
