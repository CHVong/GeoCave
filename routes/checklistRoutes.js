const express = require("express");
const router = express.Router();
const checklistController = require("../controllers/checklistController");

router.get("/", checklistController.getChecklistItems);
router.post("/", checklistController.createChecklistItem);
router.patch("/", checklistController.updateChecklistItem);
router.delete("/", checklistController.deleteChecklistItem);

module.exports = router;
