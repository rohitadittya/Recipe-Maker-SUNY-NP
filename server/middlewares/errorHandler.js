const handleError = (err, req, res, next) => {
    console.error(err);
    const errStatusCode = err?.status;
    
    if (!errStatusCode) {
        return res.status(500).send({status: 500, message: 'Internal Server Error'});
    }
    return res.status(errStatusCode).send(err);
};

module.exports = handleError;