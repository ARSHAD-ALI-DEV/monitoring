import mongoose from "mongoose";
import { config } from "dotenv";


config()

export const connect = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("mongodb connected successfully")
    }catch(error) {
        console.log(error.message)
        process.exit(1)
    }
}