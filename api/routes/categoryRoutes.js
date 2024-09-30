const express = require("express");
const {
  createCategoryController,
  getCategories,
  getCategoriesController,
} = require("../controllers/categoryController");

//router object
const router = express.Router();

//POST || create category
router.post("/create-category", createCategoryController);

// post || get category
router.get("/getCategories", getCategoriesController);

module.exports = router;
