const express = require("express");
const {
  createCategoryController,
  getCategoriesController,
  deleteCategoryController,
  updateCategoryController,
  getCategoryBySlugController,
} = require("../controllers/categoryController");

//router object
const router = express.Router();

//POST || create category
router.post("/create-category", createCategoryController);

// post || get category
router.get("/getCategories", getCategoriesController);

// post || get category
router.get("/getCategoriesBySlug/:categorySlug", getCategoryBySlugController);
//DELETE || delete blog
router.delete("/delete-category/:id", deleteCategoryController);

// update category
router.put("/update-category/:categorySlug", updateCategoryController);

module.exports = router;
