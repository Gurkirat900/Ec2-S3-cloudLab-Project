import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken"


export const verifyJWT= asyncHandler(async (req,res,next)=>{
   try {
     const token= req.cookies?.token || req.header("Authorization")?.replace("Bearer ","")
 
     if(!token){
         console.log("Unauthorised request")
         throw new ApiError(401,"Unauthorised request")
     }
 
     const decodedToken= jwt.verify(token,process.env.JWT_SECRET_KEY)
     const user= await User.findById(decodedToken?._id).select('_id name email role')
    
     if(!user){
         console.log("Invalid Access Token")
         throw new ApiError(401,"Invalid Access Token")
     }
 
     req.user= user
     next()
   } catch (error) {

    console.log("error occured");
    console.log(error.message)
    throw new ApiError(401,"inavlid access token")
   }
})