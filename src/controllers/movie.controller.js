import {createMovie, deleteMovie, getMovieById, getMovies, patchMovie, updateMovie} from "../services/movie.service.js";

export const getById = async (req, res) => {
    const id = req.params.id;
    try{
        let movie = getMovieById(id);
        res.json(movie)
    }catch (error){
        res.status(500).json({error: error.message});
    }
}
export const get = async (req, res) => {
    try{
        res.json(getMovies())
    }catch (error){
        res.status(500).json({error: error.message});
    }
}
export const create = async (req, res) => {
    try{
        res.json((createMovie()))
    }catch (error){
        res.status(500).json({error: error.message});
    }
}
export const update = async (req, res) => {
    const id = req.params.id;
    try{
        res.json(updateMovie(id))
    }catch (error){
        res.status(500).json({error: error.message});
    }
}
export const patch = async (req, res) => {
    const id = req.params.id;
    try{
        res.json(patchMovie(id))
    }catch (error){
        res.status(500).json({error: error.message});
    }
}
export const remove = async (req, res) => {
    const id = req.params.id;
    try{
        res.json(deleteMovie(id))
    }catch (error){
        res.status(500).json({error: error.message});
    }
}