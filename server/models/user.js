import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
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
    isCompany: {
      type: Boolean,
      default: false,
    },
    id: {
      type: String
    },
  });

export default mongoose.model("User", schema);
