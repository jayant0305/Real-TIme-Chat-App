const express=require('express');
const dotenv=require('dotenv');
const App=express();
const DB=require('./config/MongoDB');
const chatModel=require('./Modals/ChatModel');
const messageModel=require('./Modals/MessageModel');
const userSchema=require('./Modals/UserSchema');
const userRouter=require('./Routes/UserRoute');
const chatRouter=require('./Routes/chatRoute');
const {notFound, errorHandler} = require('./Middleware/ErrorHandler');
const cors = require('cors');

dotenv.config();
App.use(cors())
const PORT=process.env.PORT||5000;
DB()

App.use(express.json())
App.use('/api/user',userRouter)
App.use('/api/chat',chatRouter)
App.use(notFound)
App.use(errorHandler)

App.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});
