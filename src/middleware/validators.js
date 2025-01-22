import mongoose from 'mongoose';

export const validateMovieId = (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            status: 'error',
            message: 'Invalid movie ID format',
            _links: {
                collection: { href: '/api/movies' }
            }
        });
    }
    next();
};

export const validateMovieData = (req, res, next) => {
    const { title, duration, genre } = req.body;
    const errors = [];

    if (!title) errors.push('Title is required');
    if (!duration) errors.push('Duration is required');
    if (!genre) errors.push('Genre is required');

    if (errors.length > 0) {
        return res.status(422).json({
            status: 'error',
            message: 'Validation failed',
            errors,
            _links: {
                self: { href: req.originalUrl }
            }
        });
    }
    next();
};