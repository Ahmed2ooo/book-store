import slugify from "slugify";
import { ErrorHandler, SendError } from "../../services/errorHandler.servicse.js";

export const convertTitleToSlug = (req,res,next)=>{
    const {title} = req.body;
    req.body.slug = slugify(title)
    next();
}

export const cathPreviewImage = ErrorHandler((req,res,next)=>{
    if(req.files){
        req.body.minPrevImage=req.files[0].path;
        next();
    }
    else{
        throw new SendError(400,"preview image is required")
        
    }
}
   
)