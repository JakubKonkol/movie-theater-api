import mongoose from "mongoose";

export const screeningSchema = new mongoose.Schema({
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    price: { type: Number, required: true },
    availableSeats: { type: Number, required: true },
    reservedSeats: [{
        seatNumber: { type: String, required: true },
        reservationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }
    }]
});
export const Screening = mongoose.model('Screening', screeningSchema);