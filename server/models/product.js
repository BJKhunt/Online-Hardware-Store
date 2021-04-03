import mongoose from "mongoose";

const schema = new mongoose.Schema(
    {
        url: {
            type: String,
        },
        catagory: {
            type: String,
        },
        sku: {
            type: String,
        },
        name: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        finish: {
            type: String,
        },
        price: {
            type: String,
        },
        size: { type: [String], default: [] },
        companyid: {
            type: String,
        },
        userid: {
            type: String,
        }
    });

export default mongoose.model("Product", schema);
