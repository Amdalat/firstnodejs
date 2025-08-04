const Post = require("../Models/PostModel");
const User = require("../Models/UserModel");

const createpost = async(req, res) => {
    // const umm = async(req, res) => {
        res.send("test")
    // }
    // { email, password }
    // const post = new Post(req.body);
    // const savedPost = await Post.save();
    // res.status(201).json(post);

    // const {email, title, content} = req.body;
    // if (!email || !title || !content) {
    //     // return res.status(400).json({message: "Fill in the details"});
    // }

    // const pemail = await User.findOne({email});
    // if (pemail) {
    //     // res.status(200).json(pemail);
    //     // res.status(200).json({message: "Email exists"});
    // }
    
    // const { email, password } = new Post(req.body);
    // const savedPost = await Post.save();

    // try {
    //     let userid = await User.f
    //     const postdata = new Post({
    //         title,
    //         content
    //     });
    //     await postdata.save();
    //     return res.status(200).json({ message: "Post Created successfully" });
    //     } catch (err) {
    //     return res.status(500).json({ message: "Error creating Post", error: err.message });
    // }
}

module.exports = {createpost};