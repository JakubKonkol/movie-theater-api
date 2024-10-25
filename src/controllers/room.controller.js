import {createRoom, deleteRoom, getRoomById, getRooms, patchRoom, updateRoom} from "../services/room.service.js";

export const getById = async (req, res) => {
    const id = req.params.id;
    try{
        let room = getRoomById(id);
        res.json(room)
    }catch (error){
        res.status(500).json({error: error.message});
    }
}
export const get = async (req, res) => {
    try{
        res.json(getRooms())
    }catch (error){
        res.status(500).json({error: error.message});
    }
}
export const create = async (req, res) => {
    try{
        res.json((createRoom()))
    }catch (error){
        res.status(500).json({error: error.message});
    }
}
export const update = async (req, res) => {
    const id = req.params.id;
    try{
        res.json(updateRoom(id))
    }catch (error){
        res.status(500).json({error: error.message});
    }
}
export const patch = async (req, res) => {
    const id = req.params.id;
    try{
        res.json(patchRoom(id))
    }catch (error){
        res.status(500).json({error: error.message});
    }
}
export const remove = async (req, res) => {
    const id = req.params.id;
    try{
        res.json(deleteRoom(id))
    }catch (error){
        res.status(500).json({error: error.message});
    }
}