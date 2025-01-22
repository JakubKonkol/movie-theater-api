import {screeningSchema} from "./screening.js";
import mongoose from "mongoose";
export const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    genre: { type: String, required: true },
    director: { type: String, required: true },
    cast: [String],
    ratings: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        score: { type: Number, min: 1, max: 5 },
        comment: String,
        createdAt: { type: Date, default: Date.now }
    }],
    screenings: [screeningSchema]
});
export const Movie = mongoose.model('Movie', movieSchema);