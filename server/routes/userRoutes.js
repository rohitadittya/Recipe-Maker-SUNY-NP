const express = require('express');

const { register, login } = require('../controllers/userController');

const router = express.Router();

//public routes
router.post('/login', login);
router.post('/register', register);

module.exports = router;