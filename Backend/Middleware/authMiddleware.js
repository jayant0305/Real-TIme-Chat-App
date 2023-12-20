const jwt=require('jsonwebtoken');
const User=require('../Modals/UserSchema')
const asyncHandler = require('express-async-handler');

const protect=asyncHandler(async(req,res,next)=>{
    let token;

    if(req.headers.authorization){
        try{
            // token=req.headers.authorization.split(' ')[1];
            const decode=jwt.verify(token,process.env.JWTSECRET)
            req.user=await User.findById(decode.id).select("-password");
            next();
        }
        catch(error){
            res.status(401)
            throw new Error("Not authorized,token failed")
        }
    }
    if(!token){
        res.status(401)
        throw new Error("Not authorized,No token")
    }
})

module.exports ={protect}