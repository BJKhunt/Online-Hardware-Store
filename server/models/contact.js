import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
        },
        userid: {
            type: String,
            required: true,
        },
        subject: { type: String },
        message: { type: String },
        name: { type: String },
        date: {
            type: Date,
            default: Date.now,
        }
    });

export default mongoose.model("Contact", schema);
