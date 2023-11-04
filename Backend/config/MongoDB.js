const mongoose=require('mongoose')
const connectDB=async ()=>{
    try{
        const connect= await mongoose.connect(process.env.MONGOURL,{
            useNewUrlParser:true,
        });
        console.log("DB Connected")
    }
    catch(error){
        console.log("Error connecting")
        process.exit()
    }
}

module.exports=connectDB