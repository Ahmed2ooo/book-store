import { ErrorHandler, SendError } from "../../services/errorHandler.servicse.js";

export const passUserId=ErrorHandler(async(req,res,next)=>{
    if(req.params.id){
        req.body.userId=req.params.id
        next()
    }else{
        throw new SendError(400,"user id is required")
    }
})