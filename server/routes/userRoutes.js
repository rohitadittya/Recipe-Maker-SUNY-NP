const express = require('express');

const { register, login, updateUser, fetchAllUsers } = require('../controllers/userController');
const { isAuthorizedUser } = require('../middlewares/authorization');

const router = express.Router();

//public routes
router.post('/login', login);
router.post('/register', register);

//protected routes
router.get('/', isAuthorizedUser, fetchAllUsers);
router.put('/update', isAuthorizedUser, updateUser)

module.exports = router;