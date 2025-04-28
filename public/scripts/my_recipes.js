import { deleteRecipeById, getAllRecipesPostedByUser } from "../services/recipe.service.js";
import { authGuard, logoutUser } from "../services/user.service.js";
import { recipeFeedRenderer } from "../utils/recipeUtils.js";


const logout_anchor = document.getElementById('logout_anchor');
const myRecipeContainer = document.getElementById('myRecipeContainer');

const onload = async () => {
    authGuard(); //check if the user is logged in, jwt token expired
    await renderRecipes();
};

const deleteRecipe = async (recipeId) => {
    console.log("Deleting recipe with ID:", recipeId);
    try {
        await deleteRecipeById(recipeId);
        console.log("Recipe deleted successfully:", recipeId);
        await renderRecipes();
    }
    catch (error) {
        console.error("Error deleting recipe:", error?.message);
        return;
    }
}

const editRecipe = async (recipeId) => {
    console.log("Editing recipe with ID:", recipeId);
    window.location.href = `/components/post_recipe.html?recipeId=${recipeId}`;
    return;
}

const renderRecipes = async () => {
    try {
        myRecipeContainer.innerHTML = "";
        const recipeList = await getAllRecipesPostedByUser();
        recipeFeedRenderer(myRecipeContainer, recipeList, deleteRecipe, editRecipe);
    }
    catch (error) {
        console.error("Error fetching recipes:", error?.message);
        return;
    }
};

logout_anchor.addEventListener('click', (e) => {
    e.preventDefault();
    logoutUser();
});

onload();