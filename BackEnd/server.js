// Variables & Imports
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const rootRoutes = require("./routes/rootRoutes.js");
const userRoutes = require("./routes/userRoutes");
const checklistRoutes = require("./routes/checklistRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");

// Middlewares
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

// Routes
app.use("/", rootRoutes);
app.use("/user", userRoutes);
app.use("/checklist", checklistRoutes);
app.use("/equipment", equipmentRoutes);

app.all("*", async (req, res) => {
  try {
    res.status(404);
    res.sendFile(path.join(__dirname, ".", "views", "404.html"));
  } catch (error) {
    console.log(error);
  }
});

// Mongoose
const PORT = process.env.PORT || 3600;
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    console.log(`Connected to MongoDB`);
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(`${error} could not connect`));
