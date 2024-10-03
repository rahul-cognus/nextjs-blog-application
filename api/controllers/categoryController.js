const categoryModel = require("../models/categoryModel");
// // Get all categories
exports.getCategoriesController = async (req, res) => {
  try {
    const categories = await categoryModel.find();
    res.status(200).send({
      success: true,
      message: "Categories fetch successful",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Getting Category",
      error,
    });
  }
};

// Create a new category
exports.createCategoryController = async (req, res) => {
  const {
    categoryName: name,
    categorySlug: slug,
    categoryDesc: description,
  } = req.body;
  try {
    const categoryExists = await categoryModel.findOne({ slug: slug });
    if (categoryExists) {
      return res.status(200).send({
        success: false,
        message: "Category already exists",
        category: categoryExists // Return the existing category (optional)
      });
    }
    const category = new categoryModel({
      name,
      slug,
      description,
    });
    await category.save();
    res.status(200).send({
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
exports.deleteCategoryController = async (req, res) => { };
