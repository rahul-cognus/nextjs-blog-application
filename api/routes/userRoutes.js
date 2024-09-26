const express = require("express");
const { updateUserController, deleteUserController, signOutController, getAllUsersController, getUserByIdController } = require("../controllers/userController");
const { adminMiddleware } = require("../middlewares/adminMiddleware");

//router object
const router = express.Router();

// GET ALL USERS || GET
router.get("/getAllUsers", adminMiddleware, getAllUsersController);
// get user
router.get('/getUserById/:userId', getUserByIdController);


// update user
router.put('/update/:userId', updateUserController);
// delete user
router.delete('/delete/:userId', deleteUserController);
// signout
router.post('/signout', signOutController);

module.exports = router;