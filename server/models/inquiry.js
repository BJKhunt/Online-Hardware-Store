import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        from: { type: String },
        to: { type: String },
        productid: { type: String },
        subject: { type: String },
        message: { type: String },
        date: {
            type: Date,
            default: Date.now,
        }
    });

export default mongoose.model("Inquiry", schema);
