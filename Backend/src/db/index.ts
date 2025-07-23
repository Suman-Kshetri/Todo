import mongoose from "mongoose";
import { DB_NAME } from "../constants";


const connectDB = async() => 
    {
        try {
            const connectionResponse = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        } catch (error) {
            console.error("MongoDB connection Error:", error);
            process.exit(1);
            
        }
    }

export default connectDB;