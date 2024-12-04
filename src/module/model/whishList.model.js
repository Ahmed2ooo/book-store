import mongoose from "mongoose";

const whislistSchema = new mongoose.Schema({
    
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    bookId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
        required:true
    }]
},{timestamps:true})

export const whislistModel= mongoose.model("Wishlist",whislistSchema)