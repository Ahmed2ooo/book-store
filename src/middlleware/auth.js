import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import { ErrorHandler, SendError } from "../services/errorHandler.servicse.js";
dotenv.config()


export const authenication = ErrorHandler(async(req,res,next)=>{
    const token = req.headers.token
    if(!token)throw new SendError(400,"token is invalid")

    await jwt.verify(token,process.env.SECRET_KEY,async(error,docodedToken)=>{
        if(error)throw new SendError(400,"token is invalid")
            req.docodedToken= docodedToken
        next();
    });
    
})

export const authorization = (Role)=>{
    return ErrorHandler(async(req,res,next)=>{
        const {role} = req.docodedToken
        if(role==Role){
            next();
        }
        else{
            throw new SendError(401,"you are not authraized")
        }
    })
}