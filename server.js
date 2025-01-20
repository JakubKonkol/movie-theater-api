import express from 'express';
import bodyParser from "body-parser";
import movieRouter from './src/routes/movie.route.js';
import reservationRoute  from "./src/routes/reservation.route.js";
import roomRoute from "./src/routes/room.route.js";
import {ApolloServer} from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import {RequestMethods} from "./src/middleware/RequestMethods.js";
import cors from "cors";
import {CorsConfiguration} from "./src/configuration/CorsConfiguration.js";
import {resolvers} from "./src/graphql/resolvers/resolvers.js";
import {readFileSync} from "fs"
import {ContentType} from "./src/middleware/ContentType.js";


const typeDefs = readFileSync("src/graphql/schemas/schema.graphql", {encoding: "utf-8"});
const app = new express();
const PORT = 8080;
const apolloServer = new ApolloServer({typeDefs, resolvers });
await apolloServer.start();

//middlewares
app.use(bodyParser.json());
app.use(cors(CorsConfiguration))
app.use(ContentType);
app.use(RequestMethods)

// routes
app.use('/api/movie', movieRouter);
app.use('/api/reservation', reservationRoute);
app.use('/api/room', roomRoute);

app.use('/graphql', express.json(), expressMiddleware(apolloServer));
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})