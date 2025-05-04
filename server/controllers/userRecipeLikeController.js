const recipeService = require("../services/recipeService");
const userRecipeLikeService = require("../services/userRecipeLike");

const likeARecipe = async (req, res) => {
    await recipeService.fetchRecipeById(req);
    await userRecipeLikeService.likeARecipe(req);
    return res.status(201).send(1);
};

module.exports = {
    likeARecipe
};