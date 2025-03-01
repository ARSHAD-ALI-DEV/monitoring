import mongoose , {Schema} from "mongoose"

const screenshotSchema = new Schema({
    screenshot: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true})


const Screenshot = mongoose.model("Screenshot", screenshotSchema)

export default Screenshot