const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
    // _id:ioneiniuc,
    userid: {type: String, required: true, unique:true},
    email:{type: String, required: true, unique:true},
    password: {type: String, required: true},
}, {timestamps: true});

const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth;