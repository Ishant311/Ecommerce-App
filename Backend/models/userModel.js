import mongoose, { Mongoose } from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        // trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        // unique:true,
    },
    phone:{
        type:String,
        required:true,
    },
    answer:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    role:{
        type:Number,
        default:0
    }
},{timestamps:true})

const userModel = mongoose.model("users",userSchema);
export default userModel; 