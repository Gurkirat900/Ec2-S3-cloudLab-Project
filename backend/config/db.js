import mongoose from "mongoose";

const connectDB= async ()=>{
    try {
        const connectionInstance= await mongoose.connect(process.env.MONGODB_URL,{
            dbName:process.env.dbName
        });
        console.log("MongoDB connection successful")
        console.log(`MongoDb connection sucessful at HOST- ${connectionInstance.connection.host}`)  // there are seprate database for deployment and devleopment hence multiple host
    } catch (error) {
        console.log("ERROR MongoDB connection failed",error)
    }
}

export default connectDB