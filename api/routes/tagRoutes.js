const express = require("express");
const {
  createTagController,
  getAllTagsController,
} = require("../controllers/tagController");
// router object

const router = express.Router();

// post || Create Tag
router.post("/create-tag", createTagController);
// Get || Get all tags
router.get("/getAllTags", getAllTagsController);

module.exports = router;
