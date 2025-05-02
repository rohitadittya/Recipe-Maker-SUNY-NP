import { deleteRecipeById, getAllRecipesPostedByUser } from "../../services/recipe.service.js";
import { authGuard } from "../../services/user.service.js";
import { recipeFeedRenderer } from "../shared/recipeCard.js";

const myRecipeContainer = document.getElementById('myRecipeContainer');

const onload = async () => {
    await renderRecipes();
};

const deleteRecipe = async (recipeId) => {
    console.info("Deleting recipe with ID:", recipeId);
    try {
        await deleteRecipeById(recipeId);
        console.info("Recipe with id", recipeId, "deleted successfully");
        await renderRecipes();
    }
    catch (error) {
        console.error("Error deleting recipe:", error?.message);
        return;
    }
}

const editRecipe = async (recipeId) => {
    console.info("Editing recipe with ID:", recipeId);
    window.location.href = `/components/protected/post_recipe.html?recipeId=${recipeId}`;
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

onload();