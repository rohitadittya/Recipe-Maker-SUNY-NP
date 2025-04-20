const recipeService = require("../services/recipeService");

const getRecipeById = async (req, res) => {
    const recipe = await recipeService.fetchRecipeById(req);
    return res.status(200).send(recipe);
};

const getAllRecipes = async (req, res) => {
    const recipes = await recipeService.fetchAllRecipes(req);
    return res.status(200).send(recipes);
};

const addRecipe = async (req, res) => {
    const recipe = await recipeService.addRecipe(req);
    return res.status(201).send(recipe);
};

module.exports = {
    getRecipeById,
    getAllRecipes,
    addRecipe
};