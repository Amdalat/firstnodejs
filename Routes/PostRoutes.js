const express = require("express");
const router = express.Router();
const {createpost, deletepost, getpostsbyuser, updatepost} = require("../Controllers/PostController");

router.post("/createpost", createpost);
router.delete("/deletepost/:title", deletepost);
router.get("/getpostsbyuser/:name", getpostsbyuser);
router.put("/updatepost/:title", updatepost);
// router.get("/test", (req, res) => {
//     res.send("GET request working!");
// });

module.exports = router;