const asyncHandler=require("express-async-handler");
const User=require("../Modals/UserSchema")
const generateToken = require("../config/genrateToken")

const registerUser=asyncHandler(async (req,res)=>{
    const {name,email,password,pic}=req.body
    if(!name||!email||!password){
        res.status(400)
        throw new Error('Please fill all the fields')
    }

    const userExists = await User.findOne({email:email})
    if(userExists){
        res.status(400)
        throw new Error('User already exists')
    }

    const newUser=await User.create({
        name:name,
        email:email,
        password,
        profileImage:pic
    })
    if(newUser){
        res.status(201).json({
            _id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            profileImage:newUser.profileImage,
            token:generateToken(newUser.id)
        })
    }
    else{
        res.status(400)
        throw new Error('Something went wrong')
    }
})



const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body
    const userExists = await User.findOne({email:email})
    console.log(await userExists.MatchPassword(password))
    if(userExists && await userExists.MatchPassword(password)) {
        res.json({
            _id:userExists._id,
            name:userExists.name,
            email:userExists.email,
            profileImage:userExists.profileImage,
            token:generateToken(userExists.id)
        })
    }
    else{
        res.status(401)
        throw new Error('Invalid credentials')
    }
})
module.exports = {registerUser,authUser}