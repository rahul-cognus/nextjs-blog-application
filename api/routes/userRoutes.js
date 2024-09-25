const express = require("express");
const { updateUserController, deleteUserController, signOutController, getAllUsersController, getUserController } = require("../controllers/userController");

//router object
const router = express.Router();

// GET ALL USERS || GET
router.get("/getusers", getAllUsersController);
// get user
router.get('/:userId', getUserController);
// // CREATE USER || POST
// router.post("/register", registerController);

// //LOGIN || POST
// router.post("/login", loginController);

// update user
router.put('/update/:userId', updateUserController);
// delete user
router.delete('/delete/:userId', deleteUserController);
// signout
router.post('/signout', signOutController);

module.exports = router;