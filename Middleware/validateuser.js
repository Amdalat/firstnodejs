const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()

const verifytoken = async(req, res, next) => {
    // console.log(req, req.cookie);
    
    const token = req.headers.cookie.split("=")[1];
    console.log(`token: ${token}`);
    
    // const token = req.cookie.access_token;

    if (!token) {
        return res.status(401).json({message: "Access denied"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SE);
        // req.body.userid = decoded.id;
        req.user = decoded;
        console.log(req.user);
        
        next();
    } catch (err) {
        return res.status(403).json({message: "Invalid token"});   
    }
}

module.exports = {verifytoken}