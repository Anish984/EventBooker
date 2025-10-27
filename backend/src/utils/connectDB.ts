import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () =>{
    const uri = process.env.MONGO_URI;
    if (!uri) {
        console.error("MONGO_URI is not set");
        throw new Error("MONGO_URI is not set");
    }
    try {
        await mongoose.connect(uri, {
        serverSelectionTimeoutMS: 10000,
        });
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        throw err;
     }
}

export default connectDB;
