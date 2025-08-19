const express = require('express');
const router = express.Router();
const {signUp, signIn, getAllAuths} = require("../Controllers/AuthController");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/", getAllAuths);

module.exports = router;