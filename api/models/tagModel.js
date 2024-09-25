const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Tag is required"],
        unique: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Tag', tagSchema);