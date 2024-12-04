
export const ErrorHandler=(fn)=>{
return(req,res,next)=>{
  Promise.resolve(fn(req,res,next)).catch(next)
}}
export class SendError extends Error{
    constructor(status,message){
        super(message)
        this.status=status
    }
}
