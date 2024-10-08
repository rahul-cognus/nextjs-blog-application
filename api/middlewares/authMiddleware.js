const JWT = require("jsonwebtoken");
const userModel = require("../models/userModel"); // Assuming you have a User model

module.exports = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    JWT.verify(token, process.env.JWT_SECRET, async (err, decode) => {
      if (err) {
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
