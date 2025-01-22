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
import {connectMongo} from "./src/db/db.js";
import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from "./src/configuration/swagger.js";

const typeDefs = readFileSync("src/graphql/schemas/schema.graphql", {encoding: "utf-8"});
const app = new express();
const PORT = 8080;
const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true
});
await apolloServer.start();
await connectMongo();

//middlewares
app.use(bodyParser.json());
app.use(cors(CorsConfiguration))
// app.use(ContentType);
app.use(RequestMethods)

// routes
app.use('/api/movies', movieRouter);
app.use('/api/reservations', reservationRoute);
app.use('/api/rooms', roomRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/graphql', express.json(), expressMiddleware(apolloServer));
app.listen(PORT, () => {
    console.log(`🚀Server is running on PORT ${PORT}`);
})