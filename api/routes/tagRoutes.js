const express = require("express");
const { createTagController } = require("../controllers/tagController")
// router object

const router = express.Router();

// post || Create Tag
router.post("/create-tag", createTagController);

module.exports = router;