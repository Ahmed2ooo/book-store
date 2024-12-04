 export const filterMiddleware = (filedName,paramsName)=>{
    return(req,res,next)=>{
        req.Query  =  req.Query.where({[filedName]:req.params[paramsName]})
        next();
    }
}

export const selectMiddleware = (fileds)=>{
    return(req,res,next)=>{
        req.Query = req.Query.select(fileds)
        next()
    }
}

export const paganationMiddleweare = ()=>{
    return async(req,res,next)=>{
        const {page,limit}=req.query;
        let currentPage = page || 1;
        let perPage = limit || 10;
        const skip = (currentPage-1)*perPage;
        const modelToken = req.Query.model
        const totalRows = await modelToken.countDocuments();
        const noOfPages = Math.ceil(totalRows/perPage);
        req.Query = req.Query.skip(skip).limit(perPage)
        const hasNext = currentPage < noOfPages
        const prevPage = currentPage>1
       const meta={
            hasNext,
            prevPage,
            currentPage,
            noOfPages,
            totalRows,
            limit,
            page:perPage
        } 
        req.meta =meta
        next();
    }
}