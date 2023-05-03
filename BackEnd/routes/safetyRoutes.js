const express = require("express");
const router = express.Router();
const safetyController = require("../controllers/safetyController");
const verifyJWT = require("../middlewares/verifyJWT");

const upload = require("../middlewares/multer");

router.use(verifyJWT);

// GET
router.get("/", safetyController.getAllSafety);

// POST
router.post("/", upload.single("imgUpload"), safetyController.createSafety);

// PATCH
router.patch("/", safetyController.updateSafety);

// DELETE
router.delete("/", safetyController.deleteSafety);

module.exports = router;
