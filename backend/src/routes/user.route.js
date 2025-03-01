import { Router } from "express";
import { login, logout, signup, verifyEmail, getMe } from "../controllers/user.js";
import { checkAuth } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";



const router  = Router()

router.route("/signup").post(upload.single("avatar"),signup)

router.route("/login").post(login)

router.route("/logout").post(checkAuth,logout)

router.route("/verify").post(checkAuth, verifyEmail)

router.route("/me").get(checkAuth, getMe)

export default router