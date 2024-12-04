import { Router } from "express";
import { authenication } from "../middlleware/auth.js";
import { addRatingAndReview } from "../control/ratingAndreview.controll.js";
import { deleteMiddleware, getMiddleware } from "../middlleware/query.middlleware.js";
import { ratingAndReviewModel } from "../module/model/ratingAndReview.model.js";
import { excuteMiddleware } from "../middlleware/excute.middleware.js";
import { filterMiddleware } from "../middlleware/feature.middleware.js";

const ratingAndReviewRoter = Router({mergeParams:true})
ratingAndReviewRoter.post("/",authenication,addRatingAndReview)
ratingAndReviewRoter.delete("/",authenication,deleteMiddleware(ratingAndReviewModel),excuteMiddleware)
ratingAndReviewRoter.delete("/:id",authenication,deleteMiddleware(ratingAndReviewModel),filterMiddleware("id","_id"),excuteMiddleware)
ratingAndReviewRoter.get("/",getMiddleware(ratingAndReviewModel),filterMiddleware("userId","id"),paganationMiddleweare(),excuteMiddleware)





export{ratingAndReviewRoter}