const tagModel = require("../models/tagModel");
// // Get all Tags
exports.getAllTagsController = async (req, res) => {
  try {
    const tags = await tagModel.find();
    res.status(200).send({
      success: true,
      message: "Tags fetch successful",
      tags,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Getting Tag",
      error,
    });
  }
};

// Create Tags
exports.createTagController = async (req, res) => {
  const { tagName: name, tagSlug: slug } = req.body;
  try {
    const tagExists = await tagModel.findOne({ slug: slug });
    if (tagExists) {
      return res.status(200).send({
        success: false,
        message: "Tag already exists",
        tag: tagExists,
      });
    }

    const tag = new tagModel({
      name,
      slug,
    });
    await tag.save();
    res.status(201).send({
      success: true,
      message: "Tag created successfully",
      tag,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Creating Tag",
      error,
    });
  }
};
