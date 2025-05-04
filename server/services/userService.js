const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = require("../models/user");
const { mapUserDAOToUser, getLoggedInUserId, mapUserListDAOToUserList } = require('../utils/utils');

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 12);
};

const fetchAllUsers = async () => {
    return mapUserListDAOToUserList(await userModel.fetchAllUsers());
};

const fetchUserByEmail = async (email) => {
    return await userModel.fetchUser(email);
};

const fetchUserById = async (userId) => {
    return await userModel.fetchUserById(userId);
};

const userLogin = async (req) => {
    const user = await fetchUserByEmail(req.body.email);
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
    const user = await fetchUserByEmail(req.body.email);
    if (user?.length > 0) {
        throw { message: 'User already exists', status: 409 };
    }
    else {
        const hashedPwd = await hashPassword(req.body.password);
        const createdUser = await userModel.addUser(req.body.username, req.body.firstname, req.body.lastname, req.body.email, hashedPwd);
        if (!createdUser) {
            throw { message: 'User could not be created', status: 500 };
        }
        return userLogin(req);
    }
};

const updateUser = async (req) => {
    const userInfoBeforeUpdate = await fetchUserById(getLoggedInUserId(req));
    if (userInfoBeforeUpdate?.length === 0) {
        throw { message: 'User not found', status: 404};
    }

    const checkIfEmailAlreadyExists = await fetchUserByEmail(req.body.email);
    if (checkIfEmailAlreadyExists?.length > 0 && checkIfEmailAlreadyExists[0].UserId !== userInfoBeforeUpdate[0].UserId) {
        throw { message: 'Email already exists', status: 409 };
    }
    let password = userInfoBeforeUpdate[0].Password;
    if (req.body.password) {
        password = await hashPassword(req.body.password);
    }

    let updatedUser = await userModel.updateUser(userInfoBeforeUpdate[0].UserId, req.body.username, req.body.firstname, req.body.lastname, req.body.email, password);
    if (!updatedUser) {
        throw { message: 'User could not be updated', status: 500 };
    }
    
    updatedUser = await fetchUserById(getLoggedInUserId(req));
    return mapUserDAOToUser(updatedUser[0]);
};

module.exports = {
    userLogin,
    userRegister,
    updateUser,
    fetchAllUsers
};