import nodemailer from "nodemailer"
import User from "../models/user.model.js";
import {config} from "dotenv"

config()

// Looking to send emails in production? Check out our Email API/SMTP product!
const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_AUTH, 
  },
});
  export async function sendEmail({ email, userId }) {
    try {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // अभी से 5 मिनट बाद

      console.log("email sending mail", email)
      console.log("userid sending mail", userId)
  
      // यूज़र को `userId` से ढूंढकर OTP अपडेट करो
      await User.findOneAndUpdate({ _id: userId }, { otp, otpExpiry }, { new: true });
  
      // Email HTML टेम्पलेट
      const emailHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 10px;">
          <h2 style="color: #333;">🔐 Your OTP Code</h2>
          <p style="font-size: 18px;">Hello,</p>
          <p style="font-size: 16px;">Your OTP for verification is:</p>
          <h1 style="text-align: center; color: #007bff;">${otp}</h1>
          <p style="font-size: 14px; color: #888;">This OTP will expire in 5 minutes. Please do not share it with anyone.</p>
          <hr>
          <p style="font-size: 12px; color: #999;">If you didn't request this, please ignore this email.</p>
        </div>
      `;
  
      // Email भेजना
      const info = await transport.sendMail({
        from: process.env.MAIL, // Sender
        to: email, // Receiver
        subject: "Your OTP Code", // Email subject
        html: emailHTML, // Email body
      });
  
      console.log("OTP Email Sent: %s", info.messageId);
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  }
  
  // Example Call (इसे बैकएंड रूट से Call कर सकते हो)