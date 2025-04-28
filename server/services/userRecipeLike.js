const userRecipeLikeModel = require('../models/userRecipeLike');
const { getLoggedInUserId } = require('../utils/utils');

// Handlers to handle internal fns
const deleteAllLikeForRecipeHandler = async (recipeId) => {
    const deleted = await userRecipeLikeModel.deleteAllLikeForRecipe(recipeId);
    if (!deleted) {
        throw { message: `Unable to delete all the likes for the recipe id ${recipeId}`, status: 500};
    }
}

// Functions to handle API
const likeARecipe = async (req) => {
    const isRecipeAlreadyLiked = await userRecipeLikeModel.fetchLikedRecipeById(req.params.id, getLoggedInUserId(req));
    if (isRecipeAlreadyLiked?.length !== 0) {
        return await unlikeARecipe(req);
    }

    const likedRecord = await userRecipeLikeModel.likeARecipe(req.params.id, getLoggedInUserId(req));
    if (!likedRecord) {
        throw { message: `Unable to like the recipe for the id ${req.params.id}`, status: 500};
    }
};

const unlikeARecipe = async (req) => {
    const unliked = await userRecipeLikeModel.unlikeARecipe(req.params.id, getLoggedInUserId(req));
    if (!unliked) {
        throw { message: `Unable to unlike the recipe for the id ${req.params.id}`, status: 500};
    }
};

module.exports = {
    likeARecipe,
    deleteAllLikeForRecipeHandler
};