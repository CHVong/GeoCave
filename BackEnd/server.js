// Variables
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;

// Routes/Model Variables
const rootRoutes = require("./Routes/rootRoute.js");

app.use(express.static("Public"));

// Routes
app.use("/", rootRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
