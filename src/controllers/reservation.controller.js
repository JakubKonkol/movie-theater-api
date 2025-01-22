import {
    createReservation, deleteReservation,
    getReservationById, getReservations,
    patchReservation, updateReservation
} from "../services/reservation.service.js";

export const getById = async (req, res) => {
    const id = req.params.id;
    try {
        const reservation = await getReservationById(id);
        if (!reservation) {
            return res.status(404).json({
                status: 'error',
                message: 'Reservation not found',
                _links: { collection: { href: '/api/reservations' } }
            });
        }

        res.setHeader('Last-Modified', new Date(reservation.createdAt).toUTCString());
        res.setHeader('Cache-Control', 'private, no-cache');

        res.json({
            status: 'success',
            data: reservation,
            _links: {
                self: { href: `/api/reservations/${id}` },
                movie: { href: `/api/movies/${reservation.movieId}` },
                payment: { href: `/api/reservations/${id}/payment` }
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}

export const get = async (req, res) => {
    try {
        const { page = 1, limit = 10, status, movieId } = req.query;
        const result = await getReservations(page, limit, { status, movieId });

        res.setHeader('X-Total-Count', result.total);
        res.setHeader('Link',
            `</api/reservations?page=${+page + 1}>; rel="next"`);

        res.json({
            status: 'success',
            data: result.items,
            _links: {
                self: { href: '/api/reservations' },
                next: { href: `/api/reservations?page=${+page + 1}` }
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}

export const create = async (req, res) => {
    try {
        const reservation = await createReservation(req.body);

        res.setHeader('Location', `/api/reservations/${reservation.id}`);

        res.status(201).json({
            status: 'success',
            data: reservation,
            _links: {
                self: { href: `/api/reservations/${reservation.id}` },
                payment: { href: `/api/reservations/${reservation.id}/payment` }
            }
        });
    } catch (error) {
        res.status(422).json({
            status: 'error',
            message: error.message
        });
    }
}

export const update = async (req, res) => {
    const id = req.params.id;
    try {
        const reservation = await updateReservation(id, req.body);
        if (!reservation) {
            return res.status(404).json({
                status: 'error',
                message: 'Reservation not found'
            });
        }

        res.json({
            status: 'success',
            data: reservation,
            _links: {
                self: { href: `/api/reservations/${id}` }
            }
        });
    } catch (error) {
        res.status(422).json({
            status: 'error',
            message: error.message
        });
    }
}

export const patch = async (req, res) => {
    const id = req.params.id;
    try {
        const reservation = await patchReservation(id, req.body);
        if (!reservation) {
            return res.status(404).json({
                status: 'error',
                message: 'Reservation not found'
            });
        }

        res.json({
            status: 'success',
            data: reservation,
            _links: {
                self: { href: `/api/reservations/${id}` }
            }
        });
    } catch (error) {
        res.status(422).json({
            status: 'error',
            message: error.message
        });
    }
}

export const remove = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await deleteReservation(id);
        if (!result) {
            return res.status(404).json({
                status: 'error',
                message: 'Reservation not found'
            });
        }

        res.status(204).end();
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}