import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        userid: { type: String },
        companyid: { type: String },
        quantity: { type: String },
        amount: { type: String },
        productid: { type: String },
        transport: { type: String },
        city: { type: String },
        state: { type: String },
        status: { type: String },
        date: {
            type: Date,
            default: Date.now,
        }
    });

export default mongoose.model("Order", schema);
