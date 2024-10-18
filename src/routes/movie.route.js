import express from 'express';
import {create, get, getById, remove, update, patch} from "../controllers/movie.controller.js";
const router = express.Router();

router.get('/:id', getById);
router.get('/', get);
router.post('/', create);
router.delete('/:id', remove);
router.patch('/:id', update);
router.put('/:id', patch);

export default router;
