const express=require('express');
const dotenv=require('dotenv');
const App=express();
dotenv.config();
const PORT=process.env.PORT||5000;

App.get('/api/chat',(req,res)=>{
    console.log(req.params.id);
})
App.get('/api/chat/:id',(req,res)=>{
    console.log(req.params.id);
})

App.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});
