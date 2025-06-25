const mongoose = require("mongoose")


const connectDB = async () => {
    try{
    await mongoose.connect(proccess.env.MONGO_DB_URI)
    console.log("MongoDB connected")
    }
    catch(err){
        console.log("failed to connect to db with following error \n" + err)
    }
}

module.exports = connectDB