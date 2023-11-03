/*
1. Sender
2. Content
 */

const mongoose=require('mongoose');
const messageModel=mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    content:{
        type:String,
        trim:true
    }
},
{
    timestamps:true
}
)

const Message = mongoose.model("MessageModel",messageModel)
module.exports=Message