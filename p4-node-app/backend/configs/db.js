import mongoose from "mongoose";
import dotEnv from "dotenv";

dotEnv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB is Connected!");
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

export default connectDB;