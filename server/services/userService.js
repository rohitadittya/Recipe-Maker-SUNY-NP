const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = require("../models/user");
const { mapUserDAOToUser } = require('../utils/utils');

const userLogin = async (req) => {
    const user = await userModel.fetchUser(req.body.email);
    if (user?.length === 0) {
        throw { message: 'User not found with the given credentials. Please try again.', status: 404 };
    }
    else {
        const doesPasswordMatch = await bcrypt.compare(req.body.password, user[0].Password);
        if (!doesPasswordMatch) {
            throw { message: 'Incorrect Password', status: 401 };
        }
        else {
            const token = jwt.sign({ userId: user[0].UserId }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return {...mapUserDAOToUser(user[0]), authToken: token};
        }
    }
};

const userRegister = async (req) => {
    const user = await userModel.fetchUser(req.body.email);
    if (user?.length > 0) {
        throw { message: 'User already exists', status: 409 };
    }
    else {
        const hashedPwd = await bcrypt.hash(req.body.password, 12);
        const createdUser = await userModel.addUser(req.body.username, req.body.firstname, req.body.lastname, req.body.email, hashedPwd);
        if (!createdUser) {
            throw { message: 'User could not be created', status: 500 };
        }
        return userLogin(req);
    }
};

module.exports = {
    userLogin,
    userRegister
};