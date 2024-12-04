import { Router } from "express";
import { askResetPassword, getMyAccounnData, logIn, resetPassword, signup, ubdateAccountData, ubdatePassword, verifyAccount } from "../control/user.controll.js";
import { authenication } from "../middlleware/auth.js";
import { cartRouter } from "./cart.routes.js";
import { orderRouter } from "./order.routes.js";
import { whishlistRouter } from "./whishlist.routes.js";
import { ratingAndReviewRoter } from "./ratingAndreview.routes.js";

const userRouter = Router({mergeParams:true})
userRouter.post("/signup",signup)
userRouter.post("/login",logIn)
userRouter.get("/verify/:token",verifyAccount)
userRouter.put("/",authenication,ubdateAccountData)
userRouter.get("/",authenication,getMyAccounnData)
userRouter.put("/password",authenication,ubdatePassword)
userRouter.post("/ask-for-reset-pasword",askResetPassword)
userRouter.put("/reset-password/:otpToken",authenication,resetPassword)

 
userRouter.use("/:id/cartitem",cartRouter)
userRouter.use("/:id/order",orderRouter)
userRouter.use("/:id/whishlistitem",whishlistRouter)
userRouter.use("/:id/rating",ratingAndReviewRoter)



export{userRouter}  