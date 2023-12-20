const asyncHandler=require("express-async-handler");
const User=require("../Modals/UserSchema")
const generateToken = require("../config/genrateToken")

const registerUser=asyncHandler(async (req,res)=>{
    const {name,email,password}=req.body
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
        password
    })
    if(newUser){
        res.status(201).json({
            _id:newUser._id,
            name:newUser.name,
            email:newUser.email,
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

// /api/user?search=jayant
const allUsers =asyncHandler(async()=>{
    const keyword=req.query.search?{
        $or:[
            {name:{$regex:req.query.search,$options:"i"}},
            {name:{$regex:req.query.search,$options:"i"}}, //i => case insensitive
        ],
    }:{};

    const users=await User.findOne(keyword)
    res.send(users)
})
module.exports = {registerUser,authUser,allUsers}