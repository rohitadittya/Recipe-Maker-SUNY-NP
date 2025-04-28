const db = require('../config/db_connect');

const fetchLikedRecipeById = async (recipeId, userId) => {
    const sql = `SELECT * FROM USER_RECIPE_LIKE WHERE UserId=? AND RecipeId=?`;
    return await db.query(sql, [userId, recipeId]);
};

const likeARecipe = async (recipeId, userId) => {
    const sql = `INSERT INTO USER_RECIPE_LIKE (UserId, RecipeId) values (?, ?)`;
    return await db.query(sql, [userId, recipeId]);
};

const unlikeARecipe = async (recipeId, userId) => {
    const sql = `DELETE FROM USER_RECIPE_LIKE WHERE UserId=? AND RecipeId=?`;
    return await db.query(sql, [userId, recipeId]);
};

const deleteAllLikeForRecipe = async (recipeId) => {
    const sql = `DELETE FROM USER_RECIPE_LIKE WHERE RecipeId=?`;
    return await db.query(sql, [recipeId]);
}

module.exports = {
    likeARecipe,
    unlikeARecipe,
    fetchLikedRecipeById,
    deleteAllLikeForRecipe
};