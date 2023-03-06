// Variables & Imports
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const rootRoutes = require("./Routes/rootRoute.js");

// Middlewares
app.use(express.static("Public"));

// Routes
app.use("/", rootRoutes);
app.all("*", rootRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
