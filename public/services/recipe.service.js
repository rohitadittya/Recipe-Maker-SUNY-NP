const recipes = [];

export const getRecipe = (id) => {
    return recipes.find((recipe) => recipe.id === id);
};

export const addRecipe = (recipe) => {
    recipes.push(recipe);
    console.log("All recipes", recipes);
    return recipe;
};