import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    count:{
        type:Number,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
        required:true
    }
},{timestamps:true})
  
export const cartModel= mongoose.model("Cart",cartSchema)