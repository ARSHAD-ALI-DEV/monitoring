import express from "express"
import { config } from "dotenv"
import { connect } from "./src/lib/db.js"
import cookieParser from "cookie-parser"
import userRoute from "./src/routes/user.route.js"
import screenshotRoute from "./src/routes/screenshot.route.js"
import cors from 'cors'


config()
connect()
const port = process.env.PORT || 3000
const app = express()

app.use(cors({
    origin: process.env.DOMAIN,
    credentials: true
}))
app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json({limit: "50mb"}))
app.use("/api/auth", userRoute)
app.use("/api/screen", screenshotRoute)

app.listen(port, () => {
    console.log(`server in running on port ${port}`)
})