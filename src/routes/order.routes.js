import {Router}from "express"
import { authenication } from "../middlleware/auth.js";
import {  getMiddleware } from "../middlleware/query.middlleware.js";
import { filterMiddleware, paganationMiddleweare } from "../middlleware/feature.middleware.js";
import { orderModel } from "../module/model/order.model.js";
import { passUserId } from "../module/middleware/order.middleware.js";
import { makeOrder } from "../control/order.controll.js";
import { excuteMiddleware } from "../middlleware/excute.middleware.js";


const orderRouter = Router({mergeParams:true});

orderRouter.post("/",authenication,passUserId,makeOrder)
orderRouter.get("/",getMiddleware(orderModel),filterMiddleware("userId","id"),paganationMiddleweare(),excuteMiddleware)

export {orderRouter} 