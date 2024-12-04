import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
 
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    orderItem:[{
        bookId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Book",
        },
        count:{
            type:Number,
            default:0
        },
    }],
    totalAmount:{
        type:Number,
        default:0
    },
    totalPrice:{
        type:Number,
        default:0
    },
    address:{
        governate:{
            type:String
        },
        street:{
            type:String
        },
        description:{
            type:String
        }
    },
    paymentMethod:{
      type:String,
      enum:["cash","online"],
      default:"cash"
    },
    paymentId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Payment"
    }


    
},{timestamps:true})

export const orderModel= mongoose.model("Order",orderSchema)