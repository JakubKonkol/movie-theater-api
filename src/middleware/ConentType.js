export const ContentType = (req, res, next) => {
    const ct = req.get('Content-Type');
    if (!ct || ct !== 'application/json') {
        return res.status(400).json({error: "Content-Type must be application/json"});
    }
    next();
}