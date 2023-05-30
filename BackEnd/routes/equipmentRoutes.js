const express = require("express");
const router = express.Router();
const equipmentController = require("../controllers/equipmentController");
const verifyJWT = require("../middlewares/verifyJWT");

const upload = require("../middlewares/multer");

router.use(verifyJWT);

// GET
router.get("/", equipmentController.getAllEquipment);
router.get("/search", equipmentController.getSearchedEquipment);
router.get("/recentlyUpdated", equipmentController.getRecent);
router.get("/nameAZ", equipmentController.getNameAZ);
router.get("/nameZA", equipmentController.getNameZA);
router.get("/stockHighToLow", equipmentController.getStockHighToLow);
router.get("/stockLowToHigh", equipmentController.getStockLowToHigh);
router.get("/newest", equipmentController.getNewest);
router.get("/oldest", equipmentController.getOldest);
router.get("/equipmentCount", equipmentController.getEquipmentCount);

// POST
router.post("/", upload.single("imgUpload"), equipmentController.createEquipment);

// PATCH
// router.patch("/", equipmentController.updateEquipment);
router.patch("/", equipmentController.updateItem);
router.patch("/picture", upload.single("file"), equipmentController.updatePicture);
router.patch("/stock", equipmentController.updateStock);
// router.patch("/vendor", equipmentController.updateVendor);

// DELETE
router.delete("/", equipmentController.deleteEquipment);

module.exports = router;
