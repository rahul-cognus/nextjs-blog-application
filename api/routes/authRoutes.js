const express = require("express");
const { registerController, loginController } = require("../controllers/authController");


//router object
const router = express.Router();


// CREATE USER || POST
router.post("/register", registerController);

// login
router.post("/login", loginController)

module.exports = router;