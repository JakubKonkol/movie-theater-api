import {Movie} from "../model/movie.js";
export const getMovieById = async (id) => {
    const stringId = String(id);
    return Movie.findById(stringId).exec();
}

export const getMovies = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;
    const total = await Movie.countDocuments();
    const items = await Movie.find()
        .skip(skip)
        .limit(limit)
        .exec();

    return {
        items,
        total
    };
}

export const createMovie = async (movieData) => {
    const movie = new Movie(movieData);
    return await movie.save();
}

export const updateMovie = async (id, movieData) => {
    return await Movie.findByIdAndUpdate(
        id,
        movieData,
        { new: true, runValidators: true }
    ).exec();
}

export const patchMovie = async (id, partialMovieData) => {
    return await Movie.findByIdAndUpdate(
        id,
        { $set: partialMovieData },
        { new: true, runValidators: true }
    ).exec();
}

export const deleteMovie = async (id) => {
    return await Movie.findByIdAndDelete(id).exec();
}