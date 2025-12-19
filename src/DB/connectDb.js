import mongoose from "mongoose";



const connectDB = async () => {


    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB connected : ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection error:", error);
        
    }
};

export default connectDB;
// import mongoose from "mongoose";
// mongoose.set("bufferCommands", false);

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// const connectDB = async () => {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(process.env.MONGO_URI, {
//       bufferCommands: false,   // 👈 VERY IMPORTANT
//       serverSelectionTimeoutMS: 5000
//     });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// };

// export default connectDB;

