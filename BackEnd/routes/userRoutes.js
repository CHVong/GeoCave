const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyJWT = require("../middlewares/verifyJWT");

router.post("/", userController.createNewUser);
router.use(verifyJWT);
router.get("/", userController.getAllUsers);
router.patch("/", userController.updateUser);
router.delete("/", userController.deleteUser);

module.exports = router;
