const Post = require("../Models/PostModel");
const Auth = require("../Models/AuthModel");
const User = require("../Models/UserModel");

const createpost = async (req, res) => {
    const { email, title, content } = req.body;

    if (!email || !title || !content) {
        return res.status(400).json({ message: "Fill in the details" });
    }

    try {
        const userinauthm = await Auth.findOne({ email });
        const titles = await Post.findOne({ title });
        const userinuserm = await User.findById(userinauthm.userid);

        if (!userinauthm) {
            return res.status(404).json({ message: "Email not found" });
        }
        if (titles) {
            return res.status(404).json({ message: "Title exists" });
        }

        const postdata = new Post({
            title,
            content,
            userid: userinauthm._id,
            authorname: userinuserm.name 
        });

        await postdata.save();

            
        return res.status(201).json({ message: "Post Created successfully", post: postdata});

    } catch (err) {
        return res.status(500).json({ message: "Error creating Post", error: err.message });
    }
};

const deletepost = async(req, res) =>{
    try {
        const result = await Post.findOneAndDelete({title: req.params.title});
        res.status(200).json({message: "Deleted successfully"})
    } catch (error) {
        res.status(400).json({err: "error deleting"})
    }
};

const getpostsbyuser = async(req, res) =>{
    try {
        const posts = await Post.find({authorname: req.params.name});
        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({err: "error collating"})
    }
};

const updatepost = async(req, res) =>{
    try {
        const updatedpost = await Post.findOneAndUpdate({title: req.params.title}, req.body, { new: true });
        res.status(200).json(updatedpost);
    } catch (error) {
        res.status(400).json({err: "error updating"})
    }
};

module.exports = { createpost, deletepost, getpostsbyuser, updatepost };