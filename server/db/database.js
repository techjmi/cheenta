const mongoose =require("mongoose")
const URI=process.env.MONGO_URI;
const mongoDB=async()=>{
    try {
        await mongoose.connect(URI)
        console.log("connect is sucessfull with mongodb")
    } catch (error) { 
        console.log("connection failed")
        console.log(error.message)
        // console.log(error)
        process.exit(0)
    }
}
module.exports= mongoDB