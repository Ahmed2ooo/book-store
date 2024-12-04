import { bookModel } from "../module/model/book.model.js";
import { ratingAndReviewModel } from "../module/model/ratingAndReview.model.js";
import { ErrorHandler, SendError } from "../services/errorHandler.servicse.js";

export const addRatingAndReview = ErrorHandler(async(req,res)=>{
  const{rating,review,bookId}=req.body
  const { _id: userId } = req.docodedToken;
   
  const book = await bookModel.findById(bookId);
  if(!book)throw new SendError(400,"Book not found")

    const newRatingAndReview = await ratingAndReviewModel.create({rating,review,bookId,addedBy:userId})
    if(!newRatingAndReview)throw new SendError(400,"can not Rating and Review")
    res.status(200).json({
     message:"sucesses!",
     data: newRatingAndReview
    })
})