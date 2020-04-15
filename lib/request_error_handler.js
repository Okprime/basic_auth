/**
 * @param err
 * @param req
 * @param res
 * @param next
 */
module.exports = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        return res.errorResponse({ statusCode: 400, message: err.message || err });
    }
    res.status(500).send(`${err.stack || err}`);
};
