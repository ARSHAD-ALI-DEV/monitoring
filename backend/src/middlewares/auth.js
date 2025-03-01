import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { config } from "dotenv";

config();

export const checkAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt || req.headers['authorization']?.replace("Bearer ", "").trim()


    if (!token) {
      return res
        .status(400)
        .json({ message: "Token not provided, please login" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("CHECK AUTH ERROR:", error.message);
    return res.status(401).json({ message: "Unauthenticated user" });
  }
};
