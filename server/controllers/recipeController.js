const recipeService = require("../services/recipeService");
const userRecipeLikeService = require('../services/userRecipeLike');
const commentService = require('../services/commentService');
const { getLoggedInUserId } = require("../utils/utils");

const getRecipeById = async (req, res) => {
    const recipe = await recipeService.fetchRecipeById(req);
    return res.status(200).send(recipe);
};

const getAllUserPostedRecipes = async (req, res) => {
    const recipes = await recipeService.fetchAllUserPostedRecipes(req);
    return res.status(200).send(recipes);
};

const getAllRecipes = async (req, res) => {
    const recipes = await recipeService.fetchAllRecipes(req);
    return res.status(200).send(recipes);
};

const addRecipe = async (req, res) => {
    const recipe = await recipeService.addRecipe(req);
    return res.status(201).send(recipe);
};

const updateRecipe = async (req, res) => {
    await recipeService.checkIfRecipeOwnedByUserHandler(req.params.id, getLoggedInUserId(req));
    const recipe = await recipeService.updateRecipe(req);
    return res.status(200).send(recipe);
};

const deleteRecipe = async (req, res) => {
    await recipeService.checkIfRecipeOwnedByUserHandler(req.params.id, getLoggedInUserId(req));
    await userRecipeLikeService.deleteAllLikeForRecipeHandler(req.params.id);
    await commentService.deleteAllCommentsForRecipeHandler(req.params.id);
    await recipeService.deleteRecipe(req);
    return res.status(200).send(1);
};


module.exports = {
    getRecipeById,
    getAllRecipes,
    addRecipe,
    getAllUserPostedRecipes,
    updateRecipe,
    deleteRecipe
};