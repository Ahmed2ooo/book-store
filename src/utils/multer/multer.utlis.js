import multer from "multer";
import { v4 as uuidv4 } from 'uuid';

const diskStorge = multer.diskStorage({
    destination:(req,file,cb)=>{
       cb(null,"./PublicBook/books")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now+"-"+uuidv4()+"-"+file.originalname)
    }
})
export const upload = multer({storage:diskStorge}) 