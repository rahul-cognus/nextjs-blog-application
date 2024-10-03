const tagModel = require("../models/tagModel");
// // Get all Tags
exports.getAllTagsController = () => { }

// Create Tags
exports.createTagController = async (req, res) => {
    const { tagName: name, tagSlug: slug } = req.body;
    try {
        const tag = new tagModel({
            name, slug
        });
        await tag.save();
        res.status(201).send({
            success: true,
            message: "Tag created successfully",
            tag
            
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error Creating Tag",
            error
        })
    }
}