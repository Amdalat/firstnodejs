const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    age: Number
    // email:{type: String, required: true, unique:true},
    // password: {type: String, default:'avatar'},
    // createdat: {type: Date, default: Date.now} use timestamps instead
    // role: {type: String, default:'user'},
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;