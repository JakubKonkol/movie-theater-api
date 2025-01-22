export const movieResolvers = {
    Query: {
        movies: async (_, { filter, sort, page = 1, limit = 10 }) => {
            let query = {};
            if (filter) {
                query = { ...filter };
            }
            return Movie.find(query)
                .skip((page - 1) * limit)
                .limit(limit);
        },
        movie: async (_, { id }) => await Movie.findById(id)
    },
    Mutation: {
        createMovie: async (_, { input }) => {
            const movie = new Movie(input);
            return await movie.save();
        },
    }
};