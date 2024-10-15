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
    categoryName,
    categorySlug,
    categoryDesc,
    categoryTextColor,
    categoryBackgroundColor,
    metaTitle,
    robots,
    metaKeywords,
    metaDescription,
  } = req.body;
  try {
    // Check if categoryName or categorySlug already exists
    const categoryExistsByName = await categoryModel.findOne({ categoryName });
    const categoryExistsBySlug = await categoryModel.findOne({ categorySlug });
    if (categoryExistsByName) {
      return res.status(400).send({
        success: false,
        message: "Category name already exists",
      });
    }

    if (categoryExistsBySlug) {
      return res.status(400).send({
        success: false,
        message: "Category slug already exists",
      });
    }
    const category = new categoryModel({
      categoryName,
      categorySlug,
      categoryDesc,
      categoryTextColor,
      categoryBackgroundColor,
      metaTitle,
      robots,
      metaKeywords,
      metaDescription,
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

// update category
exports.updateCategoryController = async (req, res) => {
  const { id } = req.params;
  const {
    categoryName,
    categorySlug,
    categoryDesc,
    categoryTextColor,
    categoryBackgroundColor,
    metaTitle,
    robots,
    metaKeywords,
    metaDescription,
  } = req.body;

  try {
    // Check if the category exists by its ID
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    // Update category fields with the new data
    category.categoryName = categoryName || category.categoryName;
    category.categorySlug = categorySlug || category.categorySlug;
    category.categoryDesc = categoryDesc || category.categoryDesc;
    category.categoryTextColor =
      categoryTextColor || category.categoryTextColor;
    category.categoryBackgroundColor =
      categoryBackgroundColor || category.categoryBackgroundColor;
    category.metaTitle = metaTitle || category.metaTitle;
    category.robots = robots || category.robots;
    category.metaKeywords = metaKeywords || category.metaKeywords;
    category.metaDescription = metaDescription || category.metaDescription;

    // Save the updated category
    await category.save();

    res.status(200).send({
      success: true,
      message: "Blog Category updated successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error updating Blog Category",
      error,
    });
  }
};

// Delete a category by ID
exports.deleteCategoryController = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await categoryModel.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting Category",
      error,
    });
  }
};

// get category by Slug
exports.getCategoryBySlugController = async (req, res) => {
  const { categorySlug } = req.params;
  try {
    const category = await categoryModel.findOne({ categorySlug });

    // If category not found
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }

    // Return the found blog
    res.status(200).send({
      success: true,
      message: "Category fetched successfully",
      category,
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

// get Category by id
exports.getCategoryByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await categoryModel.findById(id);
    // if category not found
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "Category not found",
      });
    }
    // return the found blog
    res.status(200).send({
      success: true,
      message: "Category fetched successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Getting Category By Id",
      error,
    });
  }
};
