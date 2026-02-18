import {Router} from "express"
import { login, signup, changePassword, logout } from "../controllers/authController.js"
import { validateBody} from "../middlewares/validateBody.js"  
import { verifyJWT } from "../middlewares/authMiddleware.js"

const router= Router()

router.post("/signup",validateBody("signup"),signup)
router.post("/login",validateBody("login"),login)
router.post("/change-password",verifyJWT,validateBody("changePass"),changePassword)
router.post("/logout",verifyJWT,logout)

export default router;