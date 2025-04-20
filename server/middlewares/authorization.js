const jwt = require('jsonwebtoken');
const { setLoggedInUserId } = require('../utils/utils');

const isAuthorizedUser = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        throw { status: 401, message: 'Access Denied, unauthorized!' };
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        setLoggedInUserId(req, decodedToken.userId);
        next();
    }
    catch (err) {
        throw { status: 401, message: 'Invalid Token' };
    }
};

module.exports = {
    isAuthorizedUser
};