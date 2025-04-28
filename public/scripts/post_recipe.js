import Recipe from "../model/recipe.js";
import { addRecipe, getRecipeById, updateRecipeById } from "../services/recipe.service.js";
import { authGuard, logoutUser } from "../services/user.service.js";

const recipeForm = document.getElementById('upsertRecipeForm');
const upsertHeaderElement = document.getElementById('upsertRecipeHeader');
const logout_anchor = document.getElementById('logout_anchor');

let editMode = false;

const onload = async () => {
    authGuard(); //check if the user is logged in, jwt token expired

    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has('recipeId') && queryParams.get('recipeId') !== "") {
        const recipeId = queryParams.get('recipeId');
        editMode = true;
        await renderRecipeForEdit(recipeId);
        console.log("Editing recipe with ID:", recipeId);
    }
};

const renderRecipeForEdit = async (recipeId) => {
    try {
        const recipe = await getRecipeById(recipeId);
        upsertHeaderElement.innerText = "Edit Recipe";
        if (recipe) {
            document.getElementById("recipeId").value = recipe.recipeId;
            document.getElementById("title").value = recipe.title;
            document.getElementById("description").value = recipe.description;
            document.getElementById("ingredients").value = recipe.ingredients;
            document.getElementById("instructions").value = recipe.instructions;
        } else {
            console.error("Recipe not found for editing:", recipeId);
        }
    }
    catch (error) {
        editMode=false;
        console.error("Error fetching recipe for edit:", error?.message);
        return;
    }
};

recipeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const ingredients = document.getElementById("ingredients").value;
    const instructions = document.getElementById("instructions").value;
    
    try {
        if (editMode) {
            const recipeId = document.getElementById("recipeId").value;
            await updateRecipeById(recipeId, new Recipe(title, description, ingredients, instructions));
            console.log("Recipe updated successfully:");
        }
        else {
            await addRecipe(new Recipe(title, description, ingredients, instructions));
            console.log("Recipe created successfully:");
        }
        
        window.location.href = '/components/my_recipes.html';
        recipeForm.reset();
    }
    catch (error) {
        console.error("Error during recipe creation:", error?.message);
        return;
    }
});

logout_anchor.addEventListener('click', (e) => {
    e.preventDefault();
    logoutUser();
});

onload();
