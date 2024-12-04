import { ErrorHandler } from "../services/errorHandler.servicse.js";


export const passUserIdmiddleware = ErrorHandler(async(req,res,next)=>{
   const {_id} = req.docodedToken
   req.body.userId =_id;
   next(); 
})