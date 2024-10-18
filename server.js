import express from 'express';
import bodyParser from "body-parser";
import movieRouter from './src/routes/movie.route.js';
import reservationRoute  from "./src/routes/reservation.route.js";
import roomRoute from "./src/routes/room.route.js";

const app = new express();
const PORT = 8080;

app.use(bodyParser.json());

app.use('/api/movie', movieRouter);
app.use('/api/reservation', reservationRoute);
app.use('/api/room', roomRoute);

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})