const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// controller



// get all users
exports.getAllUsersController = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).send({
            success: true,
            message: "users fetch successful",
            users
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error fatching users",
            error
        })
    }
}
// get user by id
exports.getUserByIdController = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        res.status(200).send({
            success: true,
            message: "User fetched",
            user
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "Error fatching user ",
            error
        })
    }

}

//update user
exports.updateUserController = () => {

}

//deleteUser  user
exports.deleteUserController = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            })
        }
        await user.deleteOne();
        res.status(200).send({
            success: true,
            message: "User deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error deleting user",
            error
        })
    }

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