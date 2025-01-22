import {createMovie, deleteMovie, getMovieById, getMovies, patchMovie, updateMovie} from "../services/movie.service.js";

export const getById = async (req, res) => {
    const id = req.params.id;
    try{
        const movie = getMovieById(id);
        if (!movie) {
            return res.status(404).json({
                status: 'error',
                message: 'Movie not found',
                _links: {
                    self: { href: `/api/movies/${id}` },
                    collection: { href: '/api/movies' }
                }
            });
        }
        res.setHeader('Cache-Control', 'private, max-age=300');
        res.setHeader('ETag', `W/"movie-${id}-${Date.now()}"`);
        res.setHeader('Last-Modified', new Date().toUTCString());

        res.json({
            status: 'success',
            data: movie,
            _links: {
                self: { href: `/api/movies/${id}` },
                collection: { href: '/api/movies' },
                screenings: { href: `/api/movies/${id}/screenings` }
            }
        });
    }catch (error){
        res.status(500).json({
            status: 'error',
            message: error.message,
            _links: {
                self: { href: `/api/movies/${id}` }
            }
        });
    }
}
export const get = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const movies = await getMovies(page, limit);

        res.setHeader('Cache-Control', 'private, max-age=300');
        res.setHeader('X-Total-Count', movies.total);
        res.setHeader('Link',
            `</api/movies?page=${page + 1}&limit=${limit}>; rel="next", ` +
            `</api/movies?page=${Math.ceil(movies.total / limit)}&limit=${limit}>; rel="last"`
        );

        res.json({
            status: 'success',
            data: movies.items,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(movies.total / limit),
                totalItems: movies.total
            },
            _links: {
                self: { href: `/api/movies?page=${page}&limit=${limit}` },
                next: { href: `/api/movies?page=${page + 1}&limit=${limit}` },
                last: { href: `/api/movies?page=${Math.ceil(movies.total / limit)}&limit=${limit}` }
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            _links: {
                self: { href: '/api/movies' }
            }
        });
    }
}

export const create = async (req, res) => {
    try {
        const movie = await createMovie(req.body);

        res.setHeader('Location', `/api/movies/${movie.id}`);
        res.setHeader('Last-Modified', new Date().toUTCString());

        res.status(201).json({
            status: 'success',
            message: 'Movie created successfully',
            data: movie,
            _links: {
                self: { href: `/api/movies/${movie.id}` },
                collection: { href: '/api/movies' }
            }
        });
    } catch (error) {
        res.status(422).json({
            status: 'error',
            message: error.message,
            _links: {
                self: { href: '/api/movies' }
            }
        });
    }
}

export const update = async (req, res) => {
    const id = req.params.id;
    try {
        const movie = await updateMovie(id, req.body);
        if (!movie) {
            return res.status(404).json({
                status: 'error',
                message: 'Movie not found',
                _links: {
                    collection: { href: '/api/movies' }
                }
            });
        }

        res.setHeader('Last-Modified', new Date().toUTCString());
        res.setHeader('ETag', `W/"movie-${id}-${Date.now()}"`);

        res.json({
            status: 'success',
            message: 'Movie updated successfully',
            data: movie,
            _links: {
                self: { href: `/api/movies/${id}` },
                collection: { href: '/api/movies' }
            }
        });
    } catch (error) {
        res.status(422).json({
            status: 'error',
            message: error.message,
            _links: {
                self: { href: `/api/movies/${id}` }
            }
        });
    }
}

export const patch = async (req, res) => {
    const id = req.params.id;
    try {
        const movie = await patchMovie(id, req.body);
        if (!movie) {
            return res.status(404).json({
                status: 'error',
                message: 'Movie not found'
            });
        }

        res.setHeader('Last-Modified', new Date().toUTCString());
        res.setHeader('ETag', `W/"movie-${id}-${Date.now()}"`);

        res.json({
            status: 'success',
            message: 'Movie patched successfully',
            data: movie,
            _links: {
                self: { href: `/api/movies/${id}` },
                collection: { href: '/api/movies' }
            }
        });
    } catch (error) {
        res.status(422).json({
            status: 'error',
            message: error.message,
            _links: {
                self: { href: `/api/movies/${id}` }
            }
        });
    }
}

export const remove = async (req, res) => {
    const id = req.params.id;
    try {
        await deleteMovie(id);

        res.setHeader('X-Resource-Id', id);
        res.setHeader('X-Resource-State', 'deleted');

        res.status(204).end();
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
            _links: {
                self: {href: `/api/movies/${id}`}
            }
        });
    }
}