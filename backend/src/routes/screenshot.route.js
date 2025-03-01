import { Router } from "express";
import { checkAuth } from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";
import { sendShot, getUsers, watchAct, myActivity } from "../controllers/screenshot.js";



const router = Router()

router.route("/send-shot").post(checkAuth, upload.single("screenshot"),sendShot)
router.route("/users").get(checkAuth, getUsers)
router.route("/activity").get(checkAuth, myActivity )
router.route("/activity/:id").get(checkAuth,watchAct)

export default router