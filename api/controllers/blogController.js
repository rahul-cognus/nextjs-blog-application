const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");

//GET ALL BLOGS
exports.getAllBlogsController = () => { };

// blog by id
exports.getBlogByIdController = () => { };

//get blog by user
exports.getUserBlogControlller = () => { };

//Create Blog
exports.createBlogController = async (req, res) => {
  const { blogTitle: title, bannerImage, slug, blogDesc: description, content, category, tags } =
    req.body;
  // const bannerImage = req.file ? req.file.filename : null; // Get the uploaded file
  try {
    const blog = new blogModel({
      title,
      slug,
      description,
      bannerImage: bannerImage ? `/uploads/images/${bannerImage}` : null, // Save image path in DB
      content,
      // author: req.user._id, // Assuming the user is authenticated
      category,
      tags,
    });
    await blog.save();
    res.status(201).send({
      success: true,
      message: "Blog post created successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating blog post",
      error,
    });
  }
};

//Update Blog
exports.updateBlogController = () => { };

//Delete Blog
exports.deleteBlogController = () => { };
