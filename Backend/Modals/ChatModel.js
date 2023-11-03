//chatName
//isGroupChat
//users
//latestMessage
/*
1. chatName
2. isGroupChat
3. users
4. latestMessage
 */
const mongoose=require('mongoose');
const chatModel=mongoose.Schema(
    {
        chatName:{
            type:String,
            trim:true
        },
        isGroupChat:{
            type:Boolean,
            default:false
        },
        users:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }],
        latestMessage:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"Message"
        },
        groupAdmin:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps:true
    }
)

const Chat = mongoose.model("ChatModel",chatMode)
module.exports=Chat