const express = require("express");
const router = express.Router();
const countController = require("../controllers/countController");
const verifyJWT = require("../middlewares/verifyJWT");

router.use(verifyJWT);
router.get("/", countController.getAllCounts);

module.exports = router;
