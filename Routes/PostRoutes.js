const express = require("express");
const path = require("path");
const router = express.Router();
const {verifytoken} = require("../Middleware/validateuser");
const {createpost, getsinglepost, getallposts} = require("../Controllers/PostController");

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/profiles')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage });

router.post("/posts", verifytoken, upload.single('image'), createpost);
router.get("/post/:id", getsinglepost);
router.get("/allposts", getallposts);

module.exports = router;


// const {createpost, deletepost, getpostsbyuser, updatepost} = require("../Controllers/PostController");
// router.delete("/deletepost/:title", deletepost);
// router.get("/getpostsbyuser/:name", getpostsbyuser);
// router.put("/updatepost/:title", updatepost);
