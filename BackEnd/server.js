// Variables & Imports
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const rootRoutes = require("./routes/rootRoute.js");
const corsOptions = require("./config/corsOptions");

// Middlewares
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", rootRoutes);
app.all("*", rootRoutes);

// Mongoose
const PORT = process.env.PORT || 3600;
mongoose
  .connect(process.env.DATABASE_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.log(`${error} could not connect`));
