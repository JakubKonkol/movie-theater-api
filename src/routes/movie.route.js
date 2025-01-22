import express from 'express';
import {create, get, getById, remove, update, patch} from "../controllers/movie.controller.js";
import {validateMovieData, validateMovieId} from "../middleware/validators.js";

const router = express.Router();

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Retrieve a movie by ID
 *     description: Get detailed information about a specific movie by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Details of the movie.
 *       404:
 *         description: Movie not found.
 */
router.get('/:id', validateMovieId, getById);

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Retrieve all movies
 *     description: Get a list of all movies stored in the database.
 *     responses:
 *       200:
 *         description: A list of movies.
 */
router.get('/', get);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Create a new movie
 *     description: Add a new movie to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       201:
 *         description: Movie created successfully.
 *       400:
 *         description: Invalid movie data.
 */
router.post('/', validateMovieData, create);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Delete a movie
 *     description: Remove a movie from the database by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Movie deleted successfully.
 *       404:
 *         description: Movie not found.
 */
router.delete('/:id', validateMovieId, remove);

/**
 * @swagger
 * /movies/{id}:
 *   patch:
 *     summary: Update specific movie fields
 *     description: Partially update a movie's information.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *
 *     responses:
 *       200:
 *         description: Movie updated successfully.
 *       400:
 *         description: Invalid data provided.
 *       404:
 *         description: Movie not found.
 */
router.patch('/:id', validateMovieId, validateMovieData, update);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Replace a movie
 *     description: Fully replace a movie's information in the database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the movie to replace.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Movie replaced successfully.
 *       400:
 *         description: Invalid data provided.
 *       404:
 *         description: Movie not found.
 */
router.put('/:id', validateMovieId, validateMovieData, patch);

export default router;
