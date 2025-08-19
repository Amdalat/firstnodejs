const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const authSchema = new mongoose.Schema({
    // _id:ioneiniuc,
    // userid: {type: String, required: true, unique:true},
    userid: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    email:{type: String, required: true, unique:true},
    password: {type: String, required: true},
}, {timestamps: true});

authSchema.methods.comparepassword = async function (password) {
    const isPasswordValid = await bcrypt.compare(password, this.password);
    return isPasswordValid;
}

authSchema.statics.findByEmail = function (email) {
    return this.findOne({email});;
}


const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth;