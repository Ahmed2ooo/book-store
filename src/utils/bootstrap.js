import cors from "cors"
import { dbConnection } from "./dbConnection.js"
import env from "dotenv"
import { v1Router } from "./v1.routers.js"
env.config()

export const bootstrap = async(app)=>{
    app.use(cors())
    app.use("/api/v1/",v1Router)
    app.use((error,req,res,next)=>{
       const status = error.status || 500;
       const message = error.message || 'Internal Server Error'
       res.status(status).json({status,message})
    })
    await dbConnection();
    app.listen(process.env.PORT,()=>{
        console.log(`server is running on port ${process.env.PORT}`)
    })
}