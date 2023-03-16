const express = require("express");
const router = express.Router();
const equipmentController = require("../controllers/equipmentController");
const verifyJWT = require("../middlewares/verifyJWT");

router.use(verifyJWT);

router.get("/", equipmentController.getAllEquipment);
router.post("/", equipmentController.createEquipment);
router.patch("/", equipmentController.updateEquipment);
router.delete("/", equipmentController.deleteEquipment);

module.exports = router;
