import { getAllRecipes, likeARecipeById } from "../../services/recipe.service.js";
import { authGuard } from "../../services/user.service.js";
import { recipeFeedRenderer } from "../shared/recipeCard.js";

const recipeFeedContainer = document.getElementById('recipeFeedContainer');

let recipeList = [];

const onload = async () => {
    await renderRecipes();
};

const likeRecipe = async (recipeId) => {
    try {
        const res = await likeARecipeById(recipeId);
        if (res) {
            recipeList = recipeList.map(recipe => {
                if (recipe.recipeId == recipeId) {
                    if (recipe?.likedByLoggedInUser) {
                        recipe.likes > 0 ? recipe.likes-- : 0;
                        recipe.likedByLoggedInUser = 0;
                    }
                    else {
                        recipe.likes++;
                        recipe.likedByLoggedInUser = 1;
                    }
                    const likeBtn = document.getElementById(`likeId_${recipeId}`);
                    likeBtn.classList.toggle('recipe_liked');
                    likeBtn.textContent=`Like ${recipe.likes}`;
                    
                }
                return recipe;
            });
        }
        console.info("Recipe liked/ unliked successfully:", recipeId);
    }
    catch (error) {
        console.error("Error deleting recipe:", error?.message);
        return;
    }
};

const comment = async (recipeId) => {
    window.location.href = `/components/protected/comment.html?recipeId=${recipeId}`;
    return;
}

const renderRecipes = async () => {
    try {
        recipeList = await getAllRecipes();
        recipeFeedRenderer(recipeFeedContainer, recipeList, null, null, likeRecipe, comment);
    }
    catch (error) {
        recipeFeedContainer.innerHTML = "";
        console.error("Error fetching recipes:", error?.message);
        return;
    }
};

onload();