const express = require("express");
const {
  getAllBlogsController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
  getUserBlogController,
  getBlogByCategorySlugController,
} = require("../controllers/blogController");
const upload = require("../middlewares/upload");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

//router object
const router = express.Router();

//routes
// GET || all blogs
router.get("/all-blog", getAllBlogsController);

//POST || create blog
router.post(
  "/create-blog",
  adminMiddleware,
  authMiddleware,
  // upload.single("bannerImage"),
  createBlogController
);

//PUT || update blog
router.put("/update-blog/:id", updateBlogController);

//GET || SIngle Blog Details
router.get("/get-blog/:id", getBlogByIdController);

//DELETE || delete blog
router.delete("/delete-blog/:id", deleteBlogController);

//GET || user blog
router.get("/user-blog/:id", getUserBlogController);

// get || get blog by category slug
router.get(
  "/getBlogsByCategorySlug/:categorySlug",
  getBlogByCategorySlugController
);

module.exports = router;
