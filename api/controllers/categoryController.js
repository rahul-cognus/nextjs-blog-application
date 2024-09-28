const categoryModel = require("../models/categoryModel");
// // Get all categories
exports.getCategories = () => {};

// Create a new category
exports.createCategoryController = async (req, res) => {
  const { name, slug, description } = req.body;
  try {
    const category = new categoryModel({
      name,
      slug,
      description,
    });
    await category.save();
    res.status(201).send({
      success: true,
      message: "Blog Category created successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error creating Blog Category",
      error,
    });
  }
};

// Delete a category by ID
exports.deleteCategory = () => {};
