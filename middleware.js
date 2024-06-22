const jwt= require("jsonwebtoken");
const configJSON = require("./config.json");

module.exports = function(req,res,next){
    const token=req.header("x-token");
    if(!token){
        return res.status(401).send("Access Denied");
    }
    try{
        const decoded=jwt.verify(token,configJSON.jwtSecret);
        req.user=decoded;
        next();
    }
    catch(ex){
        res.status(400).send("Invalid Token");
    }
}