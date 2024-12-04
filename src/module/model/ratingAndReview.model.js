import mongoose from "mongoose";

const ratingAndReviewSchema = new mongoose.Schema({
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String
    },
    addedBy:{
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

export const ratingAndReviewModel= mongoose.model("RatingAndReview",ratingAndReviewSchema)