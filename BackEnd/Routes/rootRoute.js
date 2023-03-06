const express = require("express");
const router = express.Router();
const rootController = require("../Controllers/rootController");

router.get("/", rootController.getIndex);
router.get("*", rootController.get404Page);

module.exports = router;
