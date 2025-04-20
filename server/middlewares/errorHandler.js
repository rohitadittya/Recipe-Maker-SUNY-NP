const handleError = (err, req, res, next) => {
    console.error(err);
    const errStatusCode = err?.status;
    
    if (!errStatusCode) {
        return res.status(errStatusCode).send('Internal Server Error');
    }
    return res.status(errStatusCode).send(err);
};

module.exports = handleError;