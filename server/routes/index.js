const express = require('express');

const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/recipe', recipeRoutes);

module.exports = router;