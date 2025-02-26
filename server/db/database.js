const mongoose =require("mongoose")
// const URI=  "mongodb://127.0.0.1:27017/MERN";
// const URI=process.env.MONGO_URL 
const MONGO_URL="mongodb+srv://contactshamim62:Koltech123@cluster0.siioaq7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
console.log('the url ',process.env.MONGO_URL);
const mongoDB=async()=>{
    try {
        await mongoose.connect(MONGO_URL)
        console.log("connect is sucessfull with mongodb")
    } catch (error) { 
        console.log("connection failed")
        console.log(error.message)
        // console.log(error)
        process.exit(0)
    }
}
module.exports= mongoDB