import mongoose from "mongoose";

export const connectMongo = async () => {
    try {
        await mongoose.connect('mongodb://movie-theater-admin:express123@localhost:27017/movie-theater-db?authSource=admin');
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection error", error);
    }
}