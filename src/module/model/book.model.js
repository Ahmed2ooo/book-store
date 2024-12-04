import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title:{
    type : String,
    required : true,
    minlength: [2,"title should unlees 2 "],
    maxlength: [30,"title should not be bigger 30"]

  },

  description:{
    type : String,
    required : true,
    minlength: [10,"description should unlees 10 "],
    maxlength: [500,"description should not be bigger 500"]

  },
  type:{
    type : String,
    enum : ["Printed","digital"],
    required: true
  },
  minPrevImage:{
    type:String,
    required:true
  },
  ratingAvg:{
    type:Number,
    default:0
  },
  price:{
    type:Number,
    required:true
  }
  
},{timestamps:true})

export const bookModel= mongoose.model("Book",bookSchema)