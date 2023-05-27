const express = require("express");
const router = express.Router();
const checklistController = require("../controllers/checklistController");
const verifyJWT = require("../middlewares/verifyJWT");

router.use(verifyJWT);

router.get("/", checklistController.getChecklistItems);
router.post("/", checklistController.createChecklistItem);
router.patch("/", checklistController.updateChecklistItem);
router.delete("/", checklistController.deleteChecklistItem);

module.exports = router;
