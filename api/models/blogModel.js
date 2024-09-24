const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            require: [true, "title is required"],
        },
        description: {
            type: String,
            required: [true, "description is require"],
        },
        image: {
            type: String,
            required: [true, "image is require"],
        },
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            require: [true, "user id is required"],
        },
        category: [{
            type: mongoose.Types.ObjectId,
            ref: "Category"
        }],
        tags: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Tag"
            }
        ],
        comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
    },
    { timestamps: true }
);

const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;