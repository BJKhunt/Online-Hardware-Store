import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        from: { type: String },
        to: { type: String },
        productid: { type: String },
        transport: { type: String },
        city: { type: String },
        state: { type: String },
        date: {
            type: Date,
            default: Date.now,
        }
    });

export default mongoose.model("Order", schema);
