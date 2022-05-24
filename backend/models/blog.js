
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    creator: String,
    title: String,
    link: String,
    tags: Array,
    details: String,
});

module.exports = mongoose.model("Post", postSchema);