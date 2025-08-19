const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    userid: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    slug: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    image: {type: String}
    // authorname: {type: String, required: true},
}, {timestamps: true});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;