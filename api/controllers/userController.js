const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// controller



// get all users
exports.getAllUsersController = () => {

}
// get user
exports.getUserController = () => {

}

//update user
exports.updateUserController = () => {

}

//deleteUser  user
exports.deleteUserController = () => {

}

// signout 
exports.signOutController = (req, res) => {
    try {
        res.clearCookie('access_token').status(200).json({
            success: true,
            message: "User has been Logout"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Logout",
            error
        })
    }

}