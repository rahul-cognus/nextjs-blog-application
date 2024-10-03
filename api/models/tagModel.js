const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Tag is required"],
        unique: true,
    },
    slug: {
        type: String,
        required: [true, "Slug is required"],
    }
}, { timestamps: true });

module.exports = mongoose.model('Tag', tagSchema);