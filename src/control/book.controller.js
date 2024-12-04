import { bookModel } from "../module/model/book.model.js";
import { imageModel } from "../module/model/Image.model.js";
import { ErrorHandler, SendError } from "../services/errorHandler.servicse.js";

export const bookAddinExcution = ErrorHandler(async(req,res)=>{
    if(req.files){
        let bookImagesPath = [];
        for(let i=0;i<req.files.length;i++){
            if(i!==0){
                bookImagesPath.push(req.files[i].path)
            }
        }
        const book = await req.Query;
        if(!book) throw new SendError(400,"Error in adding Book");
        const result = await imageModel.create({path:bookImagesPath,bookId:book._id})
        if (!result)throw new SendError(400,"Error in addin book Images")
            res.status(201).json({
                message:"Book added sucessufly",
                data : book,
                Images:result
           })
        
    }
})

export const ubdateBookModel = ErrorHandler(async(req,res)=>{
    if(req.files.prevImage){
        req.body.minPrevImage= req.files.prevImage[0].path
    }
    if(req.files.images){
        let bookImagesPath = [];
        for(let i=0;i<req.files.images.length;i++){
            bookImagesPath.push(req.files.images[i].path)
        }
        const addBookImage = await imageModel.updateOne({bookId:req.params.id},{path:bookImagesPath})
        if(!addBookImage) throw new SendError(400,"Error in adding Book Image")
    }
       const result = await bookModel.updateOne({bookId:req.params.id},req.body)
        if(!result) throw new SendError(400,"Error in adding Book")
          res.status(200).json({
          message:"sucusses",
          data:"result"
        })

})


export const deleteBookImages = ErrorHandler(async(req,res,next)=>{
   const result = await imageModel.deleteMany({bookId:req.params.id})
   if (!result) throw new SendError(400,"Error in deleting Book Image")
    next();
})