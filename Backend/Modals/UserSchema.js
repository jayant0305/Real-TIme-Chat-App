/*
1. Name
2. Email
3. Password
4. Profile Image
 */
const mongoose=require('mongoose');

const userSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        profileImage:{
            type:String,
            default:"default.png"
        }
    },
    {
        timestamps:true
    }
)

const User=mongoose.model("User",userSchema);
module.exports = User;