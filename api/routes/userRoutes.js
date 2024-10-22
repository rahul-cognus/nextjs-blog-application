const express = require("express");
const {
  updateUserController,
  deleteUserController,
  signOutController,
  getAllUsersController,
  getUserByIdController,
  getUserDataController,
} = require("../controllers/userController");
const { adminMiddleware } = require("../middlewares/adminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

// GET ALL USERS || GET
router.get("/getAllUsers", getAllUsersController);

// get user
router.get("/getUserData", authMiddleware, getUserDataController);

// get user
router.get("/getUserById/:userId", getUserByIdController);

// update user
router.put("/update/:userId", updateUserController);
// delete user
router.delete("/delete/:userId", deleteUserController);
// signout
router.post("/signout", signOutController);

module.exports = router;
