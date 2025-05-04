const db = require('../config/db_connect');

const fetchRecipeById = async (loggedInUser, id) => {
    const sql = `SELECT r.*, COUNT(lk.UserId) as likes, MAX(CASE WHEN lk.UserId = ? THEN 1 ELSE 0 END) AS IsLikedByLoggedInUser 
                    FROM RECIPE r LEFT JOIN USER_RECIPE_LIKE lk 
                        on r.RecipeId = lk.RecipeId WHERE r.RecipeId=? GROUP BY r.RecipeId`;
    return await db.query(sql, [loggedInUser, id]);
};

const fetchAllUserPostedRecipes = async (userId) => {
    const sql = `SELECT r.*, COUNT(lk.UserId) as likes, MAX(CASE WHEN lk.UserId = ? THEN 1 ELSE 0 END) AS IsLikedByLoggedInUser 
                    FROM RECIPE r LEFT JOIN USER_RECIPE_LIKE lk 
                        on r.RecipeId = lk.RecipeId WHERE r.UserId=? GROUP BY r.RecipeId ORDER BY r.RecipeId DESC`;
    return await db.query(sql, [userId, userId]);
};

const fetchAllRecipes = async (loggedInUser) => {
    const sql = `SELECT r.*, COUNT(lk.UserId) as likes, MAX(CASE WHEN lk.UserId = ? THEN 1 ELSE 0 END) AS IsLikedByLoggedInUser 
                    FROM RECIPE r LEFT JOIN USER_RECIPE_LIKE lk 
                        on r.RecipeId = lk.RecipeId GROUP BY r.RecipeId ORDER BY r.RecipeId DESC`;
    return await db.query(sql, [loggedInUser]);
};

const addRecipe = async (recipeName, description, ingredients, instructions, image, loggedInUser) => {
    const sql = `INSERT INTO RECIPE (RecipeName, Description, Ingredients, Instructions, Image, UserId) VALUES (?, ?, ?, ?, ?, ?)`;
    return await db.query(sql, [recipeName, description, ingredients, instructions, image, loggedInUser]);
};

const updateRecipe = async (recipeName, description, ingredients, instructions, image, loggedInUser, recipeId) => {
    const sql = `UPDATE RECIPE SET RecipeName=?, Description=?, Ingredients=?, Instructions=?, Image=? WHERE UserId=? AND RecipeId=?`;
    return await db.query(sql, [recipeName, description, ingredients, instructions, image, loggedInUser, recipeId]);
};

const deleteRecipe = async (recipeId) => {
    const sql = `DELETE FROM RECIPE WHERE RecipeId=?`;
    return await db.query(sql, [recipeId]);
};

module.exports = {
    fetchRecipeById,
    fetchAllRecipes,
    addRecipe,
    fetchAllUserPostedRecipes,
    updateRecipe,
    deleteRecipe
};