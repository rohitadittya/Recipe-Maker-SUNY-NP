const recipeModel = require('../models/recipe');

const fetchRecipeById = async (req) => {
    const recipe = await recipeModel.fetchRecipeById(req.params.id);
    if (recipe?.length === 0) {
        throw { status: 404, message: 'Recipe not found' };
    }
    return recipe[0];
};

const fetchAllRecipes = async (req) => {
    const recipes = await recipeModel.fetchAllRecipes();
    return recipes;
};

const addRecipe = async (req) => {
    const recipe = await recipeModel.addRecipe(
        req.body.recipeName,
        req.body.description,
        req.body.ingredients,
        req.body.instructions,
        req.body.image,
        req.loggedInUserId);
    if (!recipe) {
        throw { message: 'Unable to create recipe', status: 500 };
    }
    return await recipeModel.fetchRecipeById(recipe.insertId);
}

module.exports = {
    fetchRecipeById,
    fetchAllRecipes,
    addRecipe
};