const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/sendEmail");

// Generate JWT token
const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
//create user register user
exports.registerController = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    // validation
    if (!email || !password || email === "" || password === "") {
      return res.status(400).send({
        success: false,
        message: "Please fill all fields",
      });
    }
    // existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    // save new user
    const newUser = new userModel({
      email,
      password: hashedPassword,
      role,
    });
    const token = generateToken(newUser);
    try {
      await newUser.save();
      return res.status(201).send({
        success: true,
        message: "Register successful",
        newUser,
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Error in new user register",
        success: false,
        error,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Error in register controller",
      success: false,
      error,
    });
  }
};

// login user
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password || email === "" || password === "") {
      return res.status(401).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    // check user
    const validUser = await userModel.findOne({ email });
    if (!validUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //check user password  | compare password
    const validPassword = await bcrypt.compare(password, validUser.password);
    if (!validPassword) {
      return res.status(401).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    // token
    const token = generateToken(validUser);
    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json({
        success: true,
        message: "Login Successfull",
        rest,
        token,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

// forget password
exports.forgetPasswordController = async (req, res) => {
  const { email } = req.body;
  try {
    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User with this email does not exists",
      });
    }
    const resetToken = jwt.sign(
      { _id: user._id },
      process.env.RESET_PASSWORD_KEY,
      { expiresIn: "20m" }
    );
    await user.updateOne({ resetLink: resetToken });

    // send mail
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/auth/reset-password/${resetToken}`;
    const message = `You requested a password reset. Please click the following link: ${resetUrl}`;

    // Send email with reset URL
    await sendEmail({
      email: user.email,
      subject: "Password Reset",
      message,
    });
    res.status(200).send({
      success: true,
      message: "Reset password email sent",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Forget password",
      error,
    });
  }
};

// old controller
// exports.resetPasswordController = async (req, res) => {
//   const { resetToken } = req.params;
//   const { newPassword } = req.body;
//   try {
//     // verify the reset token
//     const decoded = jwt.verify(resetToken, process.env.RESET_PASSWORD_KEY);
//     const userId = decoded._id;

//     // find user by id
//     const user = await userModel.findById(userId);
//     // validation
//     if (!user || user.resetLink !== resetToken) {
//       res.status(400).send({
//         success: false,
//         message: "Invalid or expired token",
//       });
//     }
//     // hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     // Update the user's password and remove the reset link token
//     user.password = hashedPassword;
//     user.resetLink = "";
//     await user.save();

//     res.status(200).send({
//       success: true,
//       message: "Password reset successful",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error in reset password",
//       error,
//     });
//   }
// };
// new
exports.resetPasswordController = async (req, res) => {
  const { resetToken } = req.params;
  const { newPassword } = req.body;
  try {
    let decoded;
    // verify the reset token
    try {
      decoded = jwt.verify(resetToken, process.env.RESET_PASSWORD_KEY);
    } catch (error) {
      // Handle token expiration error specifically
      if (error.name === "TokenExpiredError") {
        // Find user by resetToken
        const user = await userModel.findOne({ resetLink: resetToken });
        if (user) {
          // Clear resetLink if token is expired
          user.resetLink = "";
          await user.save();
        }
        return res.status(400).send({
          success: false,
          message: "Token has expired. Please request a new password reset.",
        });
      }
      // If it's another error (like invalid token), handle it
      return res.status(400).send({
        success: false,
        message: "Invalid token",
      });
    }

    const userId = decoded._id;

    // find user by id
    const user = await userModel.findById(userId);
    // validation
    if (!user || user.resetLink !== resetToken) {
      res.status(400).send({
        success: false,
        message: "Invalid or expired token",
      });
    }
    // hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    // Update the user's password and remove the reset link token
    user.password = hashedPassword;
    user.resetLink = "";
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in reset password",
      error,
    });
  }
};
