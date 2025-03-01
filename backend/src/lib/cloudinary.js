import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
import fs from "fs";

config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadOnCloudinary = async (file) => {
  try {
    const response = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
      folder: "capture_pics",
    })
      fs.unlinkSync(file)

    return response.url;
  } catch (error) {
      if(file)  fs.unlinkSync(file)
    console.log("ERROR WHILE UPLOADING.... \n", error.message);
  }
};
export const uploadAvatar = async (file) => {
  try {
    console.log("FILE", file)
    const response = await cloudinary.uploader.upload(file, {
      resource_type: "image",
      folder: "users",
    });

    fs.unlinkSync(file)
    return response.url;
  } catch (error) {
    if(file) fs.unlinkSync(file)
    console.log("ERROR WHILE UPLOADING.... \n", error.message);
  }
};
