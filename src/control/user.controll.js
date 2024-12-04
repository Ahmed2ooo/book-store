import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { ErrorHandler, SendError } from "../services/errorHandler.servicse.js"
import { userModel } from "../module/model/user.model.js"
import { sendEmail } from "../utils/nodemailer/nodemailer.utils.js"
import { sendEmailForresetPassword } from "../utils/nodemailer/nodemailerPassword.utils.js"
dotenv.config()

export const signup = ErrorHandler(async(req,res)=>{
    const {password} = req.body
    const hashedPassword = bcrypt.hashSync(password,+process.env.SALT_ROUNDS)
    const signupResult = await userModel.create({...req.body,password:hashedPassword})
    if(!signupResult)throw new SendError(400,"Error in sign")
       await sendEmail(signupResult.email)
        res.status(200).json({
         message:"sucesses, verify your email",
         data:signupResult
    
        })
})

export const logIn = ErrorHandler(async(req,res)=>{
    const {email,password}=req.body
    const loginResult = await userModel.findOne({email})
    if(!loginResult)throw new SendError (400,"Email Not Found")
    const isMatch= bcrypt.compareSync(password,loginResult.password)
    if(!isMatch)throw new SendError(400,"Error in login process")
        const token = jwt.sign({name:loginResult.name,email:loginResult.email,_id:loginResult._id},process.env.SECRET_KEY)
        res.status(200).json({
            message:"sucesses",
            token
        })
})

export const ubdateAccountData = ErrorHandler(async(req,res)=>{
   const {email:oldEmail}=req.docodedToken
   const{email,phone,address,name}= req.body
   const ubdateUser= await userModel.findOneAndUpdate({email:oldEmail},{email,phone,address,name})
   if(!ubdateUser)throw new SendError(400,"Error in ubdating account data")
      if(email){
        ubdateUser.verified= false;
        await ubdateUser.save()
        sendEmail(email)
      }
    res.status(200).json({
    message:"sucesses",
    data : ubdateUser
    })
})
  
export const ubdatePassword = ErrorHandler(async(req,res)=>{
    const {email}=req.docodedToken
    const{password}= req.body
    const hashedPassword = bcrypt.hashSync(password,+process.env.SALT_ROUNDS)
    const ubdateUser= await userModel.findOneAndUpdate({email},{password:hashedPassword})
    if(!ubdateUser)throw new SendError(400,"Error in ubdating password")
     res.status(200).json({
     message:"sucesses, to ubdate password",
     
     })
 })


 export const getMyAccounnData = ErrorHandler(async(req,res)=>{
    const {email}=req.docodedToken
    const myAccount= await userModel.findOne({email},{password:0})
    if(!myAccount)throw new SendError(400,"Error in get my account data")
       
     res.status(200).json({
     message:"sucesses",
     data : myAccount
     })
 })


export const verifyAccount = ErrorHandler(async(req,res)=>{
    const {token}= req.params;
    const {email}= jwt.verify(token,process.env.SECRET_KEY)
    const verifyUser = await userModel.findOneAndUpdate({email},{verified:true})
    if(!verifyUser)throw new SendError(400,"Error in verfing account")
        res.status(200).json({
            message:"sucesses, account verfied",
        })
})


//reset password
//1-verify   2-OTP    3-new password

export const askResetPassword = ErrorHandler(async(req,res)=>{
   const {email}=req.body;
   const findUser = await userModel.findOne({email});
   if (!findUser)throw new SendError(400,"Error in asking for reset password, email not found")
    sendEmailForresetPassword(findUser.email)
    res.status(200).json({
        message:"sucusses, check your email"
    })
})

export const resetPassword = ErrorHandler(async(req,res)=>{
   const {email,otp,password}= req.body;
   const {otpToken}=req.params
   const {otp:docodedOtpToken}= jwt.verify(otpToken,process.env.SECRET_KEY)
   if(otp!==docodedOtpToken)throw new SendError(400,"Error in verifing otp")
    const hashedPassword = bcrypt.hashSync(password,+process.env.SALT_ROUNDS)
    const ubdateUser = await userModel.findOneAndUpdate({email},{password:hashedPassword})
    if(!ubdateUser) throw new SendError(400,"Error in reseting password")
    res.status(200).json({
    message:"sucusses to reset password"
})
})