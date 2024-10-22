const mongoose = require("mongoose");
const blogModel = require("../models/blogModel");
const categoryModel = require("../models/categoryModel");

//GET ALL BLOGS
exports.getAllBlogsController = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const blogs = await blogModel
      .find()
      .populate("author category tags")
      .skip(skip)
      .limit(limit)
      .exec();
    const totalBlogs = await blogModel.countDocuments();

    res.status(200).send({
      success: true,
      message: "All blogs fetched successfully",
      blogs,
      totalBlogs,
      currentPage: page,
      totalPages: Math.ceil(totalBlogs / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching blogs",
      error,
    });
  }
};

// blog by id
exports.getBlogByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await blogModel.findById(id).populate("author category tags");

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching blog",
      error,
    });
  }
};

// Get Blogs by User with Pagination
exports.getUserBlogController = async (req, res) => {
  const { userId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const blogs = await blogModel
      .find({ author: userId })
      .populate("author category tags")
      .skip(skip)
      .limit(limit)
      .exec();
    const totalBlogs = await blogModel.countDocuments({ author: userId });

    if (!blogs.length) {
      return res.status(404).send({
        success: false,
        message: "No blogs found for this user",
      });
    }

    res.status(200).send({
      success: true,
      message: "User blogs fetched successfully",
      blogs,
      totalBlogs,
      currentPage: page,
      totalPages: Math.ceil(totalBlogs / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching user's blogs",
      error,
    });
  }
};

//Create Blog
exports.createBlogController = async (req, res) => {
  const {
    blogTitle: title,
    bannerImage,
    slug,
    blogDesc: description,
    content,
    category,
    tags,
    status,
    metaTitle,
    robots,
    metaKeywords,
    metaDescription,
  } = req.body;
  // Convert content object to a JSON string
  const stringifiedContent = JSON.stringify(content);
  try {
    const blog = new blogModel({
      title,
      slug,
      description,
      bannerImage,
      content: stringifiedContent, // Use the stringified content
      author: req.user._id, // Assuming the user is authenticated
      category,
      tags,
      status,
      metaTitle,
      robots,
      metaKeywords,
      metaDescription,
    });
    await blog.save();
    res.status(201).send({
      success: true,
      message: "Blog post created successfully",
      blog,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error creating blog post",
      error,
    });
  }
};

//Update Blog
// Update Blog
exports.updateBlogController = async (req, res) => {
  const { id } = req.params;
  const {
    blogTitle: title,
    bannerImage,
    slug,
    blogDesc: description,
    content,
    category,
    tags,
    status,
    metaTitle,
    robots,
    metaKeywords,
    metaDescription,
  } = req.body;

  try {
    const blog = await blogModel.findById(id);

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }

    blog.title = title || blog.title;
    blog.slug = slug || blog.slug;
    blog.description = description || blog.description;
    blog.content = JSON.stringify(content) || blog.content;
    blog.bannerImage = bannerImage || blog.bannerImage;
    blog.category = category || blog.category;
    blog.tags = tags || blog.tags;
    blog.status = status || blog.status;
    blog.metaTitle = metaTitle || blog.metaTitle;
    blog.robots = robots || blog.robots;
    blog.metaKeywords = metaKeywords || blog.metaKeywords;
    blog.metaDescription = metaDescription || blog.metaDescription;

    await blog.save();

    res.status(200).send({
      success: true,
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating blog",
      error,
    });
  }
};

//Delete Blog
// Delete Blog
exports.deleteBlogController = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await blogModel.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
        blog,
      });
    }

    res.status(200).send({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting blog",
      error,
    });
  }
};
// Get Blog by Slug
exports.getBlogBySlugController = async (req, res) => {
  const { slug } = req.params;

  try {
    // Find the blog by slug
    const blog = await blogModel
      .findOne({ slug })
      .populate("author category tags comments");

    // If blog not found
    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog not found",
      });
    }

    // Return the found blog
    res.status(200).send({
      success: true,
      message: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching blog",
      error,
    });
  }
};

// get blog by category slug
// exports.getBlogByCategorySlugController = async (req, res) => {
//   const { categorySlug } = req.params;

//   try {
//     // Step 1: Find the category by its slug
//     const category = await categoryModel.findOne({ categorySlug });
//     // If category is not found
//     if (!category) {
//       return res.status(404).send({
//         success: false,
//         message: "Category not found",
//       });
//     }

//     // Step 2: Find all blogs with the matching category ID
//     const blogs = await blogModel
//       .find({ category: category._id })
//       .populate("author category tags");

//     // If blog not found
//     if (!blogs.length) {
//       return res.status(404).send({
//         success: false,
//         message: "No blogs found in this category",
//       });
//     }

//     // Return the found blog
//     res.status(200).send({
//       success: true,
//       message: `Blogs fetched successfully for category: ${categorySlug}`,
//       blogs,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Error fetching blogs by category",
//       error,
//     });
//   }
// };

exports.getBlogByCategorySlugController = async (req, res) => {
  const { categorySlug } = req.params;
  // Get searchTerm, status, and sort from query parameters
  const { searchTerm, status, sort } = req.query;
  try {
    // Step 1: Find the category by its slug
    const category = await categoryModel.findOne({ categorySlug });
    // If category is not found
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    console.log("search", searchTerm, status, sort);
    // Step 2: Prepare the filter object
    const filter = { category: category._id };
    // Add search term filter if provided
    if (searchTerm) {
      const regex = new RegExp(searchTerm, "i"); // Case-insensitive regex
      filter.$or = [
        { title: { $regex: regex } }, // Filter by blog title
        { slug: { $regex: regex } }, // Filter by blog slug
      ];
    }
    // Add status filter if provided
    if (status && status !== "all") {
      filter.status = status; // Only include blogs with the selected status
    }
    // Set sorting criteria
    let sortOptions;
    if (sort === "newest") {
      sortOptions = { createdAt: -1 }; // Newest first
    } else if (sort === "oldest") {
      sortOptions = { createdAt: 1 }; // Oldest first
    } else if (sort === "trending") {
      sortOptions = { views: -1 }; // Assuming you have a views field for trending
    } else {
      sortOptions = {}; // Default sorting (could be based on createdAt or any other criteria)
    }
    // Step 3: Find all blogs with the matching category ID and optional filters
    const blogs = await blogModel
      .find(filter)
      .sort(sortOptions)
      .populate("author category tags");

    // If no blogs found
    if (!blogs.length) {
      return res.status(404).send({
        success: false,
        message: "No blogs found in this category",
      });
    }

    // Return the found blogs
    res.status(200).send({
      success: true,
      message: `Blogs fetched successfully for category: ${categorySlug}`,
      blogs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error fetching blogs by category",
      error,
    });
  }
};
