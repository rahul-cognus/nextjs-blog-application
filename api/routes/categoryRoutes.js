const express = require("express");
const {
  createCategoryController,
  getCategoriesController,
  deleteCategoryController,
  updateCategoryController,
  getCategoryBySlugController,
  getCategoryByIdController,
} = require("../controllers/categoryController");

//router object
const router = express.Router();

//POST || create category
router.post("/create-category", createCategoryController);

// post || get category
router.get("/getCategories", getCategoriesController);

// post || get category by slug
router.get("/getCategoriesBySlug/:categorySlug", getCategoryBySlugController);
// get || get category by id
router.get("/getCategoryById/:id", getCategoryByIdController);
//DELETE || delete blog
router.delete("/delete-category/:id", deleteCategoryController);

// update category
router.put("/update-category/:id", updateCategoryController);

module.exports = router;
