import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
        required:true
    },
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
        required:true
    }
},{timestamps:true})

export const paymentModel= mongoose.model("Payment",paymentSchema)