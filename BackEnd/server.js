// Variables & Imports
require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const errorHandler = require("./middlewares/errorHandler");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const mongoose = require("mongoose");

// Middlewares
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(errorHandler);

// Routes
app.use("/", require("./routes/rootRoutes.js"));
app.use("/auth", require("./routes/authRoutes"));
app.use("/user", require("./routes/userRoutes"));
app.use("/checklist", require("./routes/checklistRoutes"));
app.use("/equipment", require("./routes/equipmentRoutes"));
app.use("/checkin", require("./routes/checkInRoutes"));

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
