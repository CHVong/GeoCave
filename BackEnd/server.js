// Variables & Imports
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3500;
const rootRoutes = require("./routes/rootRoute.js");
const corsOptions = require("./config/corsOptions");
// Middlewares
app.use(cors(corsOptions));
app.use(express.static("public"));
app.use(express.json());

// Routes
app.use("/", rootRoutes);
app.all("*", rootRoutes);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
