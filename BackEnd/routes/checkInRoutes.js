const express = require("express");
const router = express.Router();
const checkInController = require("../controllers/checkInController");
const verifyJWT = require("../middlewares/verifyJWT");

router.use(verifyJWT);

router.get("/", checkInController.getCheckInItems);
router.get("/checkInCount", checkInController.getCheckInCount);
router.post("/", checkInController.createCheckInItem);
// router.patch("/", checkInController.updateCheckInItem);
router.delete("/", checkInController.deleteCheckInItem);

module.exports = router;
