const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Tag is required"],
      unique: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
    },
    status: {
      type: String,
      enum: ["draft", "published", "unpublished"],
      default: "draft", // Default status is 'draft'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tag", tagSchema);
