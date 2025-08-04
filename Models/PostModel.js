const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userid: {type: String, required: true},
    authorname: {type: String, required: true},
    title: {type: String, required: true},
    content:  {type: String, required: true},
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;