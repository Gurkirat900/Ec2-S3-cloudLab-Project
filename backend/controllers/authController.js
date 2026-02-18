import User from "../models/User.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const signup= asyncHandler( async (req,res)=>{
    const {name,email,password}= req.body;
    const existingUser= await User.findOne({email})
    if(existingUser){
        throw new ApiError(400,"User already exists with this email")
    }
    const user= await User.create({
        name:name,
        email:email,
        password:password
    })
    const token= user.genrateAccessToken()

    const options= {
        httpOnly: true,
        secure: true, // ensures cookie is sent only over HTTPS
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    }
    res.cookie("token",token,options) // storing token in cookie with name "token" and options defined above
    .status(201).json(
        new ApiResponse(201,{token,user:
            {
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        },"User registered successfully")
    )
})

const login= asyncHandler( async (req,res)=>{
    const {email,password}= req.body;
    const user= await User.findOne({email})
    if(!user){
        throw new ApiError(400,"Invalid email or password")
    }
    const isPasswordCorrect= await user.isPasswordCorrect(password)
    if(!isPasswordCorrect){
        throw new ApiError(400,"Invalid email or password")
    }
    const token= user.genrateAccessToken()

    const options= {
        httpOnly: true,
        secure: true, // ensures cookie is sent only over HTTPS
        sameSite: "none",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
    }
    res.cookie("token",token,options) // storing token in cookie with name "token" and options defined above
    .status(200).json(
        new ApiResponse(200,{token,user:
            {
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        },"User logged in successfully")
    )
})

const changePassword= asyncHandler( async (req,res)=>{
    const userId= req.user._id;
    const {oldpass,newpass}= req.body;
    const user= await User.findById(userId)
    if(!user){
        throw new ApiError(404,"User not found")
    } 
    const isOldPasswordCorrect= await user.isPasswordCorrect(oldpass)
    if(!isOldPasswordCorrect){
        throw new ApiError(400,"Old password is incorrect")
    }
    user.password= newpass;
    await user.save();
    res.status(200).json(
        new ApiResponse(200,null,"Password changed successfully")
    )
})

const logout= asyncHandler( async (req,res)=>{
    res.clearCookie("token",{
        httpOnly: true, 
        secure: true,
        sameSite: "none"
    }).status(200).json(
        new ApiResponse(200,null,"User logged out successfully")
    )
})

export {signup,login,changePassword,logout};