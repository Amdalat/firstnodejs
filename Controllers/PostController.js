const Post = require("../Models/PostModel");

const createpost = async (req, res) => {
    // console.log(req.body);
    const {title, content } = req.body;
    // (!req.body.title || !req.body.content)
    
    if (!title || !content) {
        return res.status(400).json({ message: "Fill in the details" });
    }
    const slug = title.split(" ").join('_').toLowerCase().replace(/[^a-z0-9]/g, '');

    const post = new Post({
        ...req.body,
        slug,
        userid:req.user.id,
        image: req.file ? req.file.path : '',
    })

    try {
        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
};

const getsinglepost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('userid');

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        return res.status(200).json(post);

    } catch (err) {
        return res.status(500).json({ message: "Error getting post" });   
    }
    
    //long way instead of using populate
        // const post = await Post.findById(req.params.id);
        // const userid = post.userid;
        // const user = await User.findById(userid);
        // const authorname = user.name;
        // post["authorname"] = user.name;
}

const getallposts = async (req, res) => {
    try {
        const posts = await Post.find().populate('userid');
        return res.status(200).json({postcount: posts.length, posts});

    } catch (err) {
        return res.status(500).json({ message: "Error getting posts", error: err.message});   
    }
}

module.exports = { createpost, getsinglepost, getallposts };


// const createpost = async (req, res) => {    //mine
//     const { email, title, content } = req.body;

//     if (!email || !title || !content) {
//         return res.status(400).json({ message: "Fill in the details" });
//     }

//     try {
//         const userinauthm = await Auth.findOne({ email });
//         const titles = await Post.findOne({ title });
//         const userinuserm = await User.findById(userinauthm.userid);

//         if (!userinauthm) {
//             return res.status(404).json({ message: "Email not found" });
//         }
//         if (titles) {
//             return res.status(404).json({ message: "Title exists" });
//         }

//         const postdata = new Post({
//             title,
//             content,
//             userid: userinauthm._id,
//             authorname: userinuserm.name 
//         });

//         await postdata.save();

            
//         return res.status(201).json({ message: "Post Created successfully", post: postdata});

//     } catch (err) {
//         return res.status(500).json({ message: "Error creating Post", error: err.message });
//     }
// };

// const deletepost = async(req, res) =>{
//     try {
//         const result = await Post.findOneAndDelete({title: req.params.title});
//         res.status(200).json({message: "Deleted successfully"})
//     } catch (error) {
//         res.status(400).json({err: "error deleting"})
//     }
// };

// const getpostsbyuser = async(req, res) =>{
//     try {
//         const posts = await Post.find({authorname: req.params.name});
//         res.status(200).json(posts);
//     } catch (error) {
//         res.status(400).json({err: "error collating"})
//     }
// };

// const updatepost = async(req, res) =>{
//     try {
//         const updatedpost = await Post.findOneAndUpdate({title: req.params.title}, req.body, { new: true });
//         res.status(200).json(updatedpost);
//     } catch (error) {
//         res.status(400).json({err: "error updating"})
//     }
// };

// module.exports = { createpost, deletepost, getpostsbyuser, updatepost };