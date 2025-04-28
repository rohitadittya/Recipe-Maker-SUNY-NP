const express = require('express');

const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const commentRoutes = require('./commentRoutes');

const router = express.Router();

router.use('/user', userRoutes);
router.use('/recipe', recipeRoutes);
router.use('/comment', commentRoutes);

module.exports = router;