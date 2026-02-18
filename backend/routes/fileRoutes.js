import { Router } from "express";
import { uploadFile, getFiles, deleteFile } from "../controllers/fileController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router= Router()

router.post("/upload",verifyJWT,upload.single("file"),uploadFile)  // file is the name of the field in the form-data
router.get("/",verifyJWT,getFiles)
router.delete("/:fileId",verifyJWT,deleteFile)  // only admin can delete any file, user can delete only their own files

export default router;