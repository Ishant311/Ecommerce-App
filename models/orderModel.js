import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    products:[
        {
            type:mongoose.ObjectId,
            ref:'product'
        },
    ],
    payment:{
        type:Number,
        required:true
    },
    buyer:{
        type:mongoose.ObjectId,
        ref:'users'
    },
    status:{
        type:String,
        default:"Not Process",
        enum:["Not Process","Processing","Shipped","delivered","Cancelled"]
    }
},{timestamps:true});

export default mongoose.model("order",orderSchema)