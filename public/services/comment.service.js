import { httpClient } from "../utils/api.js";

const baseUrl = "/comment";

export const getAllCommentForRecipe = async (recipeId) => {
    return await httpClient(`${baseUrl}/${recipeId}`); 
};

export const comment = async (comment) => {
    return await httpClient(`${baseUrl}`, 'POST', comment);
};