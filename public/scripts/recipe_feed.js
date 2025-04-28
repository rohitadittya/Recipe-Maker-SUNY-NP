import { getAllRecipes, likeARecipeById } from "../services/recipe.service.js";
import { authGuard, logoutUser } from "../services/user.service.js";
import { recipeFeedRenderer } from "../utils/recipeUtils.js";

const logout_anchor = document.getElementById('logout_anchor');
const recipeFeedContainer = document.getElementById('recipeFeedContainer');

let recipeList = [];

const onload = async () => {
    authGuard(); //check if the user is logged in, jwt token expired
    await renderRecipes();
};

const likeRecipe = async (recipeId) => {
    console.log("Like a recipe with ID:", recipeId);
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

        console.log("Recipe liked/ unliked successfully:", recipeId);
    }
    catch (error) {
        console.error("Error deleting recipe:", error?.message);
        return;
    }
};

const comment = async (recipeId) => {
    window.location.href = `/components/comment.html?recipeId=${recipeId}`;
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

logout_anchor.addEventListener('click', (e) => {
    e.preventDefault();
    logoutUser();
});

onload();