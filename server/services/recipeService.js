const recipeModel = require('../models/recipe');
const { getLoggedInUserId, mapRecipeListDAOToRecipeList, mapRecipeDAOToRecipe } = require('../utils/utils');

// Handlers to handle internal fns
const fetchRecipeByIdHandler = async (recipeId, loggedInUserId) => {
    const recipe = await recipeModel.fetchRecipeById(loggedInUserId, recipeId);
    if (recipe?.length === 0) {
        throw { status: 404, message: 'Recipe not found' };
    }
    return recipe[0];
};

const checkIfRecipeOwnedByUserHandler = async (recipeId, loggedInUserId) => {
    const existingRecipe = await fetchRecipeByIdHandler(recipeId, loggedInUserId);
    if (existingRecipe.UserId !== loggedInUserId) {
        throw { status: 403, message: 'You are not authorized to edit this recipe' };
    }
};

// Functions to handle API
const fetchRecipeById = async (req) => {
    const recipe = await fetchRecipeByIdHandler(req.params.id,getLoggedInUserId(req));
    return mapRecipeDAOToRecipe(recipe);
};

const fetchAllRecipes = async (req) => {
    const recipes = await recipeModel.fetchAllRecipes(getLoggedInUserId(req));
    return mapRecipeListDAOToRecipeList(recipes);
};

const fetchAllUserPostedRecipes = async (req) => {
    const recipes = await recipeModel.fetchAllUserPostedRecipes(getLoggedInUserId(req));
    return mapRecipeListDAOToRecipeList(recipes);
};

const addRecipe = async (req) => {
    const recipe = await recipeModel.addRecipe(
        req.body.title,
        req.body.description,
        req.body.ingredients,
        req.body.instructions,
        req.body.image,
        getLoggedInUserId(req)
    );
    if (!recipe) {
        throw { message: 'Unable to create recipe', status: 500 };
    }
    return await recipeModel.fetchRecipeById(recipe.insertId);
};

const updateRecipe = async (req) => {
    const recipe = await recipeModel.updateRecipe(
        req.body.title,
        req.body.description,
        req.body.ingredients,
        req.body.instructions,
        req.body.image,
        getLoggedInUserId(req),
        req.params.id
    );
    if (!recipe) {
        throw { message: 'Unable to edit recipe', status: 500 };
    }
    return await recipeModel.fetchRecipeById(req.params.id);
};

const deleteRecipe = async (req) => {
    const recipe = await recipeModel.deleteRecipe(req.params.id);
    if (!recipe) {
        throw { message: 'Unable to delete recipe', status: 500 };
    }
};

module.exports = {
    fetchRecipeById,
    fetchAllRecipes,
    addRecipe,
    fetchAllUserPostedRecipes,
    updateRecipe,
    deleteRecipe,
    fetchRecipeByIdHandler,
    checkIfRecipeOwnedByUserHandler
};