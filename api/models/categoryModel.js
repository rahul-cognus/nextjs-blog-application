const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Category is Required"],
      unique: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is Required"],
    },
    description: {
      type: String,
      required: [true, "Description is Required"],
    },
    categoryTextColor: {
      type: String,
      required: [true, "categoryTextColor is Required"],
    },
    categoryBackgroundColor: {
      type: String,
      required: [true, "categoryBackgroundColor is Required"],
    },
    metaTitle: {
      type: String,
      required: [true, "metaTitle is Required"],
    },
    robots: {
      type: String,
      default: "noindex,nofollow",
    },
    metaKeywords: {
      type: String,
      required: [true, "metaKeywords is Required"],
    },
    metaDescription: {
      type: String,
      required: [true, "metaDescription is Required"],
    },
  },
  { timestamps: true }
);
const categoryModel = mongoose.model("Category", categorySchema);
module.exports = categoryModel;
