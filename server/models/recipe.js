const db = require('../config/db_connect');

const fetchRecipeById = async (id) => {
    const sql = `SELECT * FROM RECIPE WHERE RecipeId=?`;
    return await db.query(sql, [id]);
};

const fetchAllRecipes = async () => {
    const sql = `SELECT * FROM RECIPE`;
    return await db.query(sql, []);
};

const addRecipe = async (recipeName, description, ingredients, instructions, image, userId) => {
    const sql = `INSERT INTO RECIPE (RecipeName, Description, Ingredients, Instructions, Image, UserId) VALUES (?, ?, ?, ?, ?, ?)`;
    return await db.query(sql, [recipeName, description, ingredients, instructions, image, userId]);
};

module.exports = {
    fetchRecipeById,
    fetchAllRecipes,
    addRecipe
};