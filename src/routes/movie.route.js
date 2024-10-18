import express from 'express';
import {get} from "../controllers/movie.controller.js";
const router = express.Router();

router.get('/:id', get);

export default router;
