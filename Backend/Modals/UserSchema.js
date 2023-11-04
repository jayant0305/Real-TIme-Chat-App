/*
1. Name
2. Email
3. Password
4. Profile Image
 */
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');

const userSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        profileImage:{
            type:String,
            default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        }
    },
    {
        timestamps:true
    }
)

userSchema.method.MatchPassword=async (enterPassword) => {
    return await bcrypt.compare(enterPassword,this.password)
}
userSchema.pre('save',async()=>{
    const user=this;
    if(user.isModified('password')){
        const sale=await bcrypt.genSalt(10)
        user.password= await bcrypt.hashSync(user.password,10);
    }
    next()
})

const User=mongoose.model("User",userSchema);
module.exports = User;