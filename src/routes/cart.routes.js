import {Router}from "express"
import { authenication } from "../middlleware/auth.js";
import { passUserIdmiddleware } from "../middlleware/cart.middleware.js";
import { addMiddleware, deleteMiddleware, getMiddleware, ubdateMiddleware } from "../middlleware/query.middlleware.js";
import { cartModel } from "../module/model/cart.model.js";
import { excuteMiddleware } from "../middlleware/excute.middleware.js";
import { filterMiddleware, paganationMiddleweare } from "../middlleware/feature.middleware.js";


const cartRouter = Router({mergeParams:true});

cartRouter.post("/",authenication,passUserIdmiddleware,addMiddleware(cartModel),excuteMiddleware)
cartRouter.put("/:id",authenication,ubdateMiddleware(cartModel),filterMiddleware("_id","id"),excuteMiddleware)
cartRouter.delete("/:id",authenication,deleteMiddleware(cartModel),filterMiddleware("_id","id"),excuteMiddleware)
cartRouter.delete("/",authenication,deleteMiddleware(cartModel),excuteMiddleware)
 

// get all cart item for specfig user (filterations deband on user ID)

cartRouter.get("/",getMiddleware(cartModel),filterMiddleware("userId","id"),paganationMiddleweare(),excuteMiddleware)
export {cartRouter}