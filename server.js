import express from 'express';
import bodyParser from "body-parser";
const app = new express();
import movieRouter from './src/routes/movie.route.js';
const PORT = 8080;
app.use(bodyParser.json());

app.use('/api/movie', movieRouter);

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
})