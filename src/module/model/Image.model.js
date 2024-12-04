import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  path:[{
    type : String,
    required : true
  }],
  bookId:{
    type : mongoose.Schema.Types.ObjectId,
    ref : "Book",
    required : true
  },
 
},{timestamps:true})

export const imageModel= mongoose.model("Image",imageSchema)