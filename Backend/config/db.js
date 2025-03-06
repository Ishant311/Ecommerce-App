import mongoose from "mongoose"
const connectDB = async()=>{
    // return mongoose.connect(process.env.MONGO_URL);
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connection to Mongodb ${conn.connection.host}`);
    } catch (error) {
        console.log("Error in connection ",error)
    }   
}
export default connectDB;