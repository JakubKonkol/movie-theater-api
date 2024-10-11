import express from 'express';
import { getById } from '../service/movie.service.js';
const router = express.Router();

router.get('/:id', getById);

export default router;
