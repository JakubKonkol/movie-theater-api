import {
    createReservation, deleteReservation,
    getReservationById,
    getReservations, patchReservation,
    updateReservation
} from "../services/reservation.service.js";

export const getById = async (req, res) => {
    const id = req.params.id;
    try{
        let room = getReservationById(id);
        res.json(room)
    }catch (error){
        res.status(500).json({error: error.message});
    }
}
export const get = async (req, res) => {
    try{
        res.json(getReservations())
    }catch (error){
        res.status(500).json({error: error.message});
    }
}
export const create = async (req, res) => {
    try{
        res.json((createReservation()))
    }catch (error){
        res.status(500).json({error: error.message});
    }
}
export const update = async (req, res) => {
    const id = req.params.id;
    try{
        res.json(updateReservation(id))
    }catch (error){
        res.status(500).json({error: error.message});
    }
}
export const patch = async (req, res) => {
    const id = req.params.id;
    try{
        res.json(patchReservation(id))
    }catch (error){
        res.status(500).json({error: error.message});
    }
}
export const remove = async (req, res) => {
    const id = req.params.id;
    try{
        res.json(deleteReservation(id))
    }catch (error){
        res.status(500).json({error: error.message});
    }
}