import { cartModel } from "../module/model/cart.model.js";
import { orderModel } from "../module/model/order.model.js";
import { ErrorHandler, SendError } from "../services/errorHandler.servicse.js";

export const makeOrder = ErrorHandler(async(req,res)=>{
  const {id}=req.params
  let orderItems = []
  let totalPrice = 0
  let totalAmount = 0
  const findUserCartItem = await cartModel.find({userId:id}).populate("bookId")
  if(!findUserCartItem)throw new SendError(400,"Error in finding user cart item")
    findUserCartItem.map((item)=>{
    orderItems.push({
        bookId:item.bookId?._id,
        count:item.count
    })
    totalPrice+=item.bookId.price*item.count;
    totalAmount+=item.count
    })
    req.body.orderItems = orderItems;
    req.body.totalAmount=totalAmount
    req.body.totalPrice=totalPrice

    const result = await orderModel.create(req.body)
    await cartModel.deleteMany({userId:id})
    if(!result)throw new SendError(400,"Error in making order")
    res.status(200).json({
    message:"sucesses",
    data:result
})

})