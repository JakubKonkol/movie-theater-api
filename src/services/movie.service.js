import {moviesSampleData} from "../data/MoviesSampleData.js";

export const getMovieById = (id) => {
    return moviesSampleData.find(movie => movie.id === id);
}
export const getMovies = () => {
    return moviesSampleData;
}
export const createMovie = (movie) => {
    return {
        status: "success",
        message: "Movie created successfully",
    }
}
export const updateMovie = (id, movie) => {
    return {
        status: "success",
        message: "Movie updated successfully",
    }
}
export const patchMovie = (id, movie) => {
    return {
        status: "success",
        message: "Movie patched successfully",
    }
}
export const deleteMovie = (id) => {
    return {
        status: "success",
        message: "Movie deleted successfully",
    }
}

