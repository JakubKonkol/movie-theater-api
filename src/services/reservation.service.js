import {Reservation} from "../model/reservation.js";
export const getReservationById = async (id) => {
    return await Reservation.findById(id)
        .populate('movieId')
        .populate('userId')
        .exec();
};

export const getReservations = async (page = 1, limit = 10, filters = {}) => {
    const query = {};
    if (filters.status) query.status = filters.status;
    if (filters.movieId) query.movieId = filters.movieId;

    const total = await Reservation.countDocuments(query);
    const items = await Reservation.find(query)
        .populate('movieId')
        .populate('userId')
        .skip((page - 1) * limit)
        .limit(limit)
        .exec();

    return { items, total };
};

export const createReservation = async (reservationData) => {
    const reservation = new Reservation(reservationData);
    return await reservation.save();
};

export const updateReservation = async (id, reservationData) => {
    return await Reservation.findByIdAndUpdate(
        id,
        reservationData,
        { new: true, runValidators: true }
    ).exec();
};

export const patchReservation = async (id, partialData) => {
    return await Reservation.findByIdAndUpdate(
        id,
        { $set: partialData },
        { new: true, runValidators: true }
    ).exec();
};

export const deleteReservation = async (id) => {
    const result = await Reservation.findByIdAndDelete(id).exec();
    return !!result;
};