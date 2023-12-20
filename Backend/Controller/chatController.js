const asyncHandler=require('express-async-handler');
const Chat=require('../Modals/ChatModel')
const User=require('../Modals/UserSchema')

const accessChat = asyncHandler(async(req,res)=>{
    const {userId}=req.body
    if(!userId){
        console.log("User Id not send")
        return res.status(401)
    }
    var isChat=await Chat.find({
        isGroupChat:false,
        $and:[
            {users:{$eleMatch:{$eq:req.user._id}}},
            {users:{$eleMatch:{$eq:userId}}},
        ],
    }).populate("users","-password").populate("latestMessage")

    isChat=await User.populate(isChat,{
        path:'latestMessage',
        select:"name pic email",
    })

    if(isChat.length>0) {
        res.send(isChat[0])
    }
    else{
        var chatData={
            chatName:"sender",
            isGroupChat:false,
            user:[req.user._id,userId]
        }
        try{
            const createChat=await Chat.create(chatData)
            const fullChat=await Chat.find({_id:createChat.id}).populate("users","-password")
            res.status(200).send(fullChat)
        }
        catch(error){
            console.log(error)
            res.status(404)
            throw new Error(error.message)
        }
    }
})
const fetchChat=asyncHandler(async(req,res)=>{
    try{
        await Chat.find({users:{$eleMatch:{$eq:req.user._id}}})
        .populate("users","-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")
        .sort({updatedAt:-1})
        .then(async(results)=>{
            results=await User.populate(results,{
                path:"latestMessage",
                select:"name pic email",
            })
            res.status(200).send(results)
        })
    }
    catch(error){
        res.status(404)
        throw new Error(error.message)
    }

})
const creategroupChat=asyncHandler(async(req,res)=>{
    
})
const renameGroup=asyncHandler(async(req,res)=>{

})
const removeFromGroup=asyncHandler(async(req,res)=>{

})
const addToGroup=asyncHandler(async(req,res)=>{

})


module.exports ={accessChat,fetchChat,creategroupChat,renameGroup,removeFromGroup,addToGroup}
