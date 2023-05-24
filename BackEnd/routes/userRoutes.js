const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyJWT = require("../middlewares/verifyJWT");

router.post("/", userController.createNewUser);
router.use(verifyJWT);
router.get("/", userController.getAllUsers);
router.get("/singleUser", userController.getSingleUser);
router.get("/searchUsername", userController.searchUsername);
// router.patch("/", userController.updateUser);
router.patch("/addRole", userController.addRole);
router.patch("/updateRole", userController.updateRole);
router.patch("/updateStatus", userController.updateStatus);
router.delete("/", userController.deleteUser);

module.exports = router;
