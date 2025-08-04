const express = require('express');
const router = express.Router();
const {getUsers, getUserByName, getUserById, updateUserById, deleteUserById} = require("../Controllers/UserController");

// router.post("/", createUser);
router.get("/", getUsers);
router.get("/:name", getUserByName);
router.get("/id/:id", getUserById);
router.put("/id/:id", updateUserById);
router.delete("/id/:id", deleteUserById);

module.exports = router;