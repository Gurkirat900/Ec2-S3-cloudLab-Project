import File from "../models/File.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const uploadFile= asyncHandler( async (req,res)=>{
    if(!req.file){
        throw new ApiError(400,"No file uploaded")
    }

    // genrate s3key
    const s3Key= `${req.user._id}/${req.file.originalname}`

    const file= await File.create({
        filename: req.file.originalname,
        s3Key: s3Key,
        uploadedBy: req.user._id
    })

    // s3 integration later..
    /* const s3= awaiit s3.upload({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: s3Key,
        Body: req.file.buffer,
    }).promise() */

    return res.status(201).json(
        new ApiResponse(201,file,"File uploaded successfully")
    )
})

const getFiles = asyncHandler(async (req, res) => {

  let files;

  if (req.user.role === "admin") {
    // Admin sees all files with user details
    files = await File.find()
      .populate("uploadedBy", "name email") // populate uploadedBy with user's name and email
      .sort({ createdAt: -1 });

  } else {
    // Normal user sees only their files
    files = await File.find({ uploadedBy: req.user._id })
      .sort({ createdAt: -1 });
  }

  return res.status(200).json(
    new ApiResponse(200, files, "Files fetched successfully")
  );
});


const deleteFile= asyncHandler( async (req,res)=>{  // only admin can delete any file, user can delete only their own files
    console.log("File ID to delete:", fileId);
    const file= await File.findById(fileId)
    if(!file){
        throw new ApiError(404,"File not found")
    }
    if(file.uploadedBy.toString() !== req.user._id.toString() && req.user.role !== "admin"){
        throw new ApiError(403,"You do not have permission to delete this file")
    }

    // s3 integration later..
    /* await s3.deleteObject({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: file.s3Key,
    }).promise() */

    await file.deleteOne() // delete file from database
    
    return res.status(200).json(
        new ApiResponse(200,null,"File deleted successfully")
    )
})

export { uploadFile, getFiles, deleteFile }