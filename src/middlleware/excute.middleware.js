export const excuteMiddleware = async(req,res)=>{
    const result = await req.Query;
    res.status(200).json({
        message:"sucesses",
        data: result,
        meta:req?.meta
    })

}