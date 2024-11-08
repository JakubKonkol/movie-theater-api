import {getMovies} from "../../services/movie.service.js";

export const resolvers = {
    Query: {
        movies: () => getMovies()
    }
}