// const userModel = require('../models/userModel');

// exports.adminMiddleware = async (req, res, next) => {
//     try {
//         const user = await userModel.findById(req.body.id);
//         if (user.role !== 'admin') {
//             return res.status(401).send({
//                 success: false,
//                 message: "Only Admin ACess ",
//             });
//         } else {
//             next();
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).send({
//             success: false,
//             message: "Un-Authorized Access",
//             error
//         });
//     }
// }

// middleware/adminMiddleware.js
exports.adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    // User is authenticated and is an admin
    next();
  } else {
    // User is not an admin
    return res
      .status(403)
      .send({ success: false, message: "Access denied. Admins only." });
  }
};
