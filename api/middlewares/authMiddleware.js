const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel"); // Assuming you have a User model

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).send({
        message: "Auth Failed: No token provided",
        success: false,
      });
    }
    console.log("Token from request:", token); // Log the token for debugging
    JWT.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
        console.log("Token verification failed:", err.message); // Log the error
        return res.status(200).send({
          message: "Auth Failed",
          success: false,
        });
      } else {
        const userId = decode.id; // Extract user ID from the token

        // Find user in the database by ID
        const user = await userModel.findById(userId);

        if (!user) {
          return res.status(404).send({
            message: "User not found",
            success: false,
          });
        }

        // Store user details in request object
        req.user = user;
        console.log("User in authiddle", user);
        // Call next() to pass control to the next middleware/route handler
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: "Auth Failed",
      success: false,
    });
  }
};
