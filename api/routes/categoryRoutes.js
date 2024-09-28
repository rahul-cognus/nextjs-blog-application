const express = require("express");
const {
  createCategoryController,
} = require("../controllers/categoryController");

//router object
const router = express.Router();

//POST || create category
router.post("/create-category", createCategoryController);

module.exports = router;
