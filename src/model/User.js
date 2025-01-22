import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    profile: {
        phoneNumber: String,
        address: {
            street: String,
            city: String,
            postalCode: String
        },
        preferences: {
            favoriteGenres: [String],
            newsletterSubscribed: { type: Boolean, default: false }
        }
    },
    reservationHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }]
});
export const User = mongoose.model('User', userSchema);