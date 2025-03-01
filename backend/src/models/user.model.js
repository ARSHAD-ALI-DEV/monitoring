import mongoose , {Schema} from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        default: false,
        type: Boolean
    },
    otp: {type: String},
    otpExpiry: {type: Date}
}, {timestamps: true})

const User = mongoose.model("User", userSchema)

export default User