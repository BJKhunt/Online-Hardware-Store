import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        address: {
            type: String,
        },
        gst: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        contact: {
            type: String,
        },
        description: {
            type: String,
        },
        userid: {
            type: String,
            required: true,
        },
        isVerified: {
            type: Boolean,
            default: false,
        }
    });

export default mongoose.model("Company", schema);
