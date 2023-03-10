const express = require("express");
const router = express.Router();
const rootController = require("../controllers/rootController");

router.get("/", rootController.getIndex);
// router.get("*", rootController.get404Page);

module.exports = router;
