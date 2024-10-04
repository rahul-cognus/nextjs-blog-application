const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "title is required"],
            unique: true,
        },
        slug: {
            type: String,
            required: [true, "Slug is require"],
            unique: true
        },
        description: {
            type: String,
            required: [true, "description is require"],
        },
        bannerImage: {
            type: String,
            required: [true, "image is require"],
        },
        content: {
            type: String,
            required: [true, "Content is require"],
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        category: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }],
        status: {
            type: String,
            enum: ['draft', 'published', 'archived'],
            default: 'draft', // Default status is 'draft'
        },
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag"
            }
        ],
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    },
    { timestamps: true }
);

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;