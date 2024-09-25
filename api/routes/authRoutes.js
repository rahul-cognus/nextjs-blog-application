const express = require("express");
const { registerController, loginController, forgetPasswordController } = require("../controllers/authController");


//router object
const router = express.Router();


// CREATE USER || POST
router.post("/register", registerController);

// login
router.post("/login", loginController)

// forget password
router.put('/forget-password', forgetPasswordController)

module.exports = router;