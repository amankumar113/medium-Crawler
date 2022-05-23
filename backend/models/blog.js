
// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    creator: String,
    title: String,
    link: String,
    tags: Array,
    details: String,
});
// Post = model("post", postSchema);
module.exports = mongoose.model("Post", postSchema);