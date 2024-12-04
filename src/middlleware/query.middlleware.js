export const addMiddleware = (model)=>{
    return(req,res,next)=>{
        const adding = model.create(req.body)
        req.Query = adding
        next()
    }
}

export const getMiddleware = (model)=>{
    return(req,res,next)=>{
        const getting = model.find(req.body)
        req.Query = getting
        next()
    }
}

export const ubdateMiddleware = (model)=>{
    return(req,res,next)=>{
        const ubdating = model.updateMany(req.body)
        req.Query = ubdating
        next()
    }
}

export const deleteMiddleware = (model)=>{
    return(req,res,next)=>{
        const deleting = model.deleteMany(req.body)
        req.Query = deleting
        next()
    }
}