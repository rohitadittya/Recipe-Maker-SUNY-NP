const userService = require('../services/userService');


const login = async (req, res) => {
    const user = await userService.userLogin(req);
    return res.status(200).send(user);
};

const register = async (req, res) => {
    const user = await userService.userRegister(req);
    return res.status(201).send(user);
};

module.exports = {
    login,
    register
};