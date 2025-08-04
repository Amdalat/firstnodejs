const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

const Auth = require("../Models/AuthModel");
const User = require("../Models/UserModel");

const signUp = async (req, res) => {
    const { email, password, name, age } = req.body;
    if (!email || !password || !name || !age) {
        return res.status(400).json({ message: "Fill in the details" });
    }
    const inemail = await Auth.findOne({email});

    if (inemail) {
        return res.status(404).json({msg: "email already exists"});
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({
        name,
        age
    });

    try {
        await user.save();
        let userid = user._id;
        const authdata = new Auth({
            userid,
            password: hashedPassword,
            email
        });
        await authdata.save();
        return res.status(200).json({ message: "Sign up successful" });
    } catch (err) {
        return res.status(500).json({ message: "Error signing up", error: err.message });
    }
};

const signIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Fill in all fields" });
    }
    
    const user = await Auth.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
    }    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SE ,{expiresIn: "1h"});
    // const token = jwt.sign({ id: user._id }, process.env.JWT_SE);
    // res.status(200).json({ token });

    res.cookie('access_token', token, { // Set the token in a cookie
        httpOnly: true, // Make the cookie accessible only by the web server
        // sameSite: 'None', //  Allow cross-site cookies (for development, be cautious in production)
        // secure: true,   //  Ensure the cookie is only sent over HTTPS (for production)
        path: '/',       //  Set the cookie path to be accessible across the entire site
        expires: new Date(Date.now() + 60*60*1000),
    })

    return res.status(200).json({ message: "SignIn Successful" });

};

module.exports = {signUp, signIn};