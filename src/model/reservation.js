import mongoose from "mongoose";
const reservationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    screeningId: { type: mongoose.Schema.Types.ObjectId, required: true },
    movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    seats: [{
        seatNumber: { type: String, required: true },
        price: { type: Number, required: true }
    }],
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    paymentDetails: {
        method: { type: String, enum: ['card', 'cash', 'transfer'] },
        status: { type: String, enum: ['pending', 'completed', 'failed'] },
        transactionId: String
    },
    createdAt: { type: Date, default: Date.now }
});

export const Reservation = mongoose.model('Reservation', reservationSchema);