import { DateTime } from '../scalars/datetime.js';
import { movieResolvers } from './movie.js';

export const resolvers = {
    DateTime,
    Query: {
        ...movieResolvers.Query,
    },
    Mutation: {
        ...movieResolvers.Mutation,
    }
};