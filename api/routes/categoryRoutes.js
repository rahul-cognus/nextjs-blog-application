const express = require("express");
const {
  createCategoryController,
  getCategoriesController,
  deleteCategoryController,
} = require("../controllers/categoryController");

//router object
const router = express.Router();

//POST || create category
router.post("/create-category", createCategoryController);

// post || get category
router.get("/getCategories", getCategoriesController);
//DELETE || delete blog
router.delete("/delete-category/:id", deleteCategoryController);

module.exports = router;
