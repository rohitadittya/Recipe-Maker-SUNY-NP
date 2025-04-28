const express = require('express');

const { getRecipeById, getAllRecipes, addRecipe, getAllUserPostedRecipes, updateRecipe, deleteRecipe } = require('../controllers/recipeController');
const { isAuthorizedUser } = require('../middlewares/authorization');
const { likeARecipe } = require('../controllers/userRecipeLikeController');

const router = express.Router();

// protected routes
// Recipe Rltd
router.get('/user', isAuthorizedUser, getAllUserPostedRecipes);
router.get('/:id', isAuthorizedUser , getRecipeById);
router.post('/', isAuthorizedUser, addRecipe);
router.put('/:id', isAuthorizedUser, updateRecipe);
router.delete('/:id', isAuthorizedUser, deleteRecipe);
router.get('/', isAuthorizedUser, getAllRecipes);

// Recipe Like/ Unlike Rltd
router.post('/like/:id', isAuthorizedUser, likeARecipe);

// public routes

module.exports = router;