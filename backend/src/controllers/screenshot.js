import User from "../models/user.model.js";
import Screenshot from "../models/screenshot.js";
import { uploadOnCloudinary } from "../lib/cloudinary.js";




export const sendShot = async(req, res) => {
    try {
        const userid = req.user._id
        const user = await User.findById(userid)

        const screenshotPath = req.file?.path || null
        console.log(screenshotPath)
        const shotUrl = await uploadOnCloudinary(screenshotPath)
        console.log(shotUrl)
        const newShot = new Screenshot({
            userId: user._id,
            screenshot: shotUrl
        })

        await newShot.save()

        return res.status(200).json({message: "screen captured successfully", screenshot: newShot, status: 200})

    } catch (error) {
        return res.status(500).json({message: "Interna server error", error: error.message})
    }
}

export const getUsers = async (req, res) => {
    try {
        const userid = req.user._id;
        const users = await User.find({ _id: { $ne: userid } }).select("-password");

        return res.status(200).json({ message: "Users fetched successfully", users, status: 200 });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
export const watchAct = async (req, res) => {     
    try {         
        const { id: userId } = req.params;
        
        // स्क्रीनशॉट को लेटेस्ट सबसे पहले लाने के लिए sort इस्तेमाल करें
        const screenshots = await Screenshot.find({ userId }).sort({ createdAt: -1 });

        return res.status(200).json({
            message: "Screenshot got successfully", 
            screenshots, 
            status: 200
        });             

    } catch (error) {         
        return res.status(500).json({
            message: "Internal server error", 
            error: error.message
        });     
    } 
};

export const myActivity = async(req, res) => {
    try {
        const userId = req.user._id
        const myShots = await Screenshot.find({userId}).sort({ createdAt: -1 })

        return res.status(200).json({myShots})
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
}

