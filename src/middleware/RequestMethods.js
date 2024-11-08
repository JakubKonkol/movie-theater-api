export const RequestMethods = (req, res, next) => {
    const requestMethod = req.method;
    const allowedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
    if (!allowedMethods.includes(requestMethod)) {
        res.status(405).json({message: "Method Not Allowed"});
        return;
    }
    next();
}