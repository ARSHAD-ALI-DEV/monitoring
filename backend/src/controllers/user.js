import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../lib/nodemailer.js";
import { config } from "dotenv";
import { uploadAvatar } from "../lib/cloudinary.js";

config();
export const signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const existingUser = await User.findOne({ email });

    
    const imageLocal = req.file?.path || null;
    console.log("imageLocal:", imageLocal);

    
    const imageUrl = imageLocal ? await uploadAvatar(imageLocal) : null;

    if (existingUser) {
      if (existingUser.isVerified === false) {
        const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "18d" });
        sendEmail({ email: existingUser.email, userId: existingUser._id });

        return res
          .status(201)
          .cookie("jwt", token, { httpOnly: true, maxAge: 18 * 24 * 60 * 60 * 1000 })
          .json({ message: "Email send on your email Please verify", status: 301 });
      } 
      
      return res.status(401).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);



    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      avatar: imageUrl,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "18d" });
    sendEmail({ email: newUser.email, userId: newUser._id });

    return res
      .status(201)
      .cookie("jwt", token, { httpOnly: true, maxAge: 18 * 24 * 60 * 60 * 1000 })
      .json({ message: "Signup successful. Please verify your email.", status: 201 });
  } catch (error) {
    console.error("Signup Error:", error);
    return res.status(500).json({ message: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "User does not exists", status: 401 }).status(401);
    }

    if (user && user.isVerified == false) {
      return res.json({ message: "Please signup first properly" }).status(401);
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.json({ message: "Your password is incorrect" }).status(401);
    }

    const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "18d",
    });

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 18 * 24 * 60 * 60 * 1000,
    });
    return res
      .status(201)
      .json({ message: "User logged in successfully", user , status: 201})
      
  } catch (error) {
    return res.json({ message: error.message }).status(500);
  }
};

export const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    maxAge: 0,
  });
  return res
    .json({ message: "User logout successfully" })
    .status(201)
    
};

export const verifyEmail = async (req, res) => {
  try {
    const { otp } = req.body;
    const userId = req.user._id;

    // यूजर को डेटाबेस से खोजें
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // OTP चेक करें
    if (user.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // अगर OTP सही है तो यूजर को वेरीफाई करें
    user.isVerified = true;
    user.otp = null; // OTP को हटा दें ताकि दोबारा यूज़ न हो
    user.otpExpiry = undefined;
    await user.save();

    return res.status(200).json({ message: "Email verified successfully", user, status: 200 });
  } catch (error) {
    console.error("VERIFY EMAIL ERROR:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getMe = async(req, res) => {
  try {
    const userId = req.user._id
    const user = await User.findById(userId).select("-password")

    return res.status(200).json({message: "User goted", user})
  } catch (error) {
    return res.status(500).json({message: "internal server error"})
  }
}