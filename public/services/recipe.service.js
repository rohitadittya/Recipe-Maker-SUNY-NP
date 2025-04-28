import { httpClient } from "../utils/api.js";

const baseUrl = "/recipe";

export const getAllRecipes = async () => {
    return await httpClient(`${baseUrl}`); 
}

export const getAllRecipesPostedByUser = async () => {
    return await httpClient(`${baseUrl}/user`); 
}

export const getRecipeById = async (id) => {
    return await httpClient(`${baseUrl}/${id}`); 
};

export const addRecipe = async (recipe) => {
    return await httpClient(`${baseUrl}`, "POST", recipe);
};

export const updateRecipeById = async (recipeId, recipe) => {
    return await httpClient(`${baseUrl}/${recipeId}`, "PUT", recipe);
};

export const deleteRecipeById = async (recipeId) => {
    return await httpClient(`${baseUrl}/${recipeId}`, "DELETE");
};

export const likeARecipeById = async (recipeId) => {
    return await httpClient(`${baseUrl}/like/${recipeId}`, "POST");
};