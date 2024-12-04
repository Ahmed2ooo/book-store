import { Router } from "express";
import { addMiddleware, deleteMiddleware, getMiddleware, ubdateMiddleware } from "../middlleware/query.middlleware.js";
import { bookModel } from "../module/model/book.model.js";
import { excuteMiddleware } from "../middlleware/excute.middleware.js";
import {  filterMiddleware, paganationMiddleweare, selectMiddleware } from "../middlleware/feature.middleware.js";
import {  cathPreviewImage, convertTitleToSlug } from "../module/middleware/book.middleware.js";
import { upload } from "../utils/multer/multer.utlis.js";
import { bookAddinExcution, deleteBookImages, ubdateBookModel } from "../control/book.controller.js";

const bookRouter = Router()
bookRouter.post("/",upload.array("images"),cathPreviewImage,addMiddleware(bookModel),bookAddinExcution)
bookRouter.get("/",getMiddleware(bookModel),selectMiddleware("title description"),
paganationMiddleweare(),excuteMiddleware)
bookRouter.delete("/",deleteMiddleware(bookModel),excuteMiddleware)
//use by ID
bookRouter.get("/:id",getMiddleware(bookModel),filterMiddleware("_id","id"),excuteMiddleware)
bookRouter.put("/:id",upload.fields([{name : 'prevImage',maxCount:'1'},{name:'images',maxCount:'12'}]),ubdateBookModel)
bookRouter.delete("/:id",deleteMiddleware(bookModel),filterMiddleware("_id","id"),deleteBookImages,
excuteMiddleware)


export {bookRouter}