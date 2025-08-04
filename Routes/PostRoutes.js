const express = require("express");
const router = express.Router();
const {createpost} = require("../Controllers/PostController");

router.post("/createpost", createpost);
jjk
module.exports = router;