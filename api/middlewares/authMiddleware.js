const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Extract token from cookies
    const token = req.cookies._token; // assuming you're using cookie-parser middleware

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized. No token provided." });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWT_SECRET should be defined in your .env

    // Attach the decoded user info to the request object
    req.user = decoded;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized. Invalid token." });
  }
};

module.exports = authMiddleware;
