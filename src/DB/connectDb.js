import mongoose from "mongoose";



const connectDB = async (req, res) => {


    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);


        console.log(`MongoDB connected : ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        return res.status(400).json({
            message:"Error found",
            error
        })
    }
};

export default connectDB;
