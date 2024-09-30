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
  },
  { timestamps: true }
);
const categoryModel = mongoose.model("Category", categorySchema);
module.exports = categoryModel;
