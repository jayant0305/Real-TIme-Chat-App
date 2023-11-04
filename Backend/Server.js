const express=require('express');
const dotenv=require('dotenv');
const App=express();
const DB=require('./config/MongoDB');
const chatModel=require('./Modals/ChatModel');
const messageModel=require('./Modals/MessageModel');
const userSchema=require('./Modals/UserSchema');
const userRouter=require('./Routes/UserRoute');
dotenv.config();
const PORT=process.env.PORT||5000;
DB()

App.use(express.json())
App.use('/api/user',userRouter)

App.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});
