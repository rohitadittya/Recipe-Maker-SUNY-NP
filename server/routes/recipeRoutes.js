const express = require('express');

const { getRecipeById, getAllRecipes, addRecipe } = require('../controllers/recipeController');
const { isAuthorizedUser } = require('../middlewares/authorization');

const router = express.Router();

// protected routes
router.get('/:id', isAuthorizedUser , getRecipeById);
router.post('/', isAuthorizedUser, addRecipe);

// public routes
router.get('/', getAllRecipes);

module.exports = router;