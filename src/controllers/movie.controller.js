import {getById} from "../services/movie.service.js";

export const get = async (req, res) => {
    const id = req.params.id;
    try{
        res.json(getById())
    }catch (error){
        res.status(500).json({error: error.message});
    }
}