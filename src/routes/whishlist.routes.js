import { Router } from "express";
import { authenication } from "../middlleware/auth.js";
import { passUserId } from "../module/middleware/order.middleware.js";
import { addMiddleware, deleteMiddleware, getMiddleware } from "../middlleware/query.middlleware.js";
import { whislistModel } from "../module/model/whishList.model.js";
import { excuteMiddleware } from "../middlleware/excute.middleware.js";
import { filterMiddleware, paganationMiddleweare } from "../middlleware/feature.middleware.js";

const whishlistRouter = Router({mergeParams:true})

whishlistRouter.post("/",authenication,passUserId,addMiddleware(whislistModel),excuteMiddleware)
whishlistRouter.delete("/:id",authenication,deleteMiddleware(whislistModel),filterMiddleware("_id","id"),excuteMiddleware)
whishlistRouter.delete("/",authenication,deleteMiddleware(whislistModel),excuteMiddleware)
whishlistRouter.get("/",getMiddleware(whislistModel),filterMiddleware("userId","id"),paganationMiddleweare(),excuteMiddleware)

export {whishlistRouter}