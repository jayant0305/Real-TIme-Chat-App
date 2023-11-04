const jwt=require("jsonwebtoken");
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWTSECRET,{
        expiresIn: "10d"
    })
}

module.exports = generateToken;