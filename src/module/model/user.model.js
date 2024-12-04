import mongoose from "mongoose";

const userSchem = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength: [5,"name should unlees 5 "],
        maxlength: [22,"name should not be bigger 22"]

    },
    email:{
        type:String,
        required:true,
         match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
         unique:true
    },
    phone:{
        type:Number,
        unique:true
    },
    password:{
        type:String,
        required: true,
        minlength: [5,"password should unlees 5 "],
        maxlength: [18,"password should not be bigger 18"]
    },
    adress:{
        country:{
            type:String,

        },
        city:{
            type:String,
        },
    },
    verified:{
        type:Boolean,
        default:false
    },
    

    
},{timestamps:true})

export const userModel = mongoose.model("User",userSchem)