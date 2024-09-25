const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");


//create user register user
exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        // validation
        if (!username || !email || !password || username === '' || email === '' || password === '') {
            return res.status(400).send({
                success: false,
                message: "Please fill all fields",
            })
        }
        // existing user
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(401).send({
                success: false,
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        // save new user
        const newUser = new userModel({ username, email, password: hashedPassword })
        try {
            await newUser.save();
            return res.status(201).send({
                success: true,
                message: "Register successful",
                user
            })
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                message: "Error in new user register",
                success: false,
                error
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error in register controller",
            success: false,
            error,
        })
    }
}

// login user
exports.loginController = () => { }