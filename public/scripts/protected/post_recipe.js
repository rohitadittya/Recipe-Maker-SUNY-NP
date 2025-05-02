import Recipe from "../../model/recipe.js";
import { addRecipe, getRecipeById, updateRecipeById } from "../../services/recipe.service.js";

const recipeForm = document.getElementById('upsertRecipeForm');
const upsertHeaderElement = document.getElementById('upsertRecipeHeader');

let editMode = false;

const onload = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has('recipeId')) {
        if (queryParams.get('recipeId') !== "") {
            const recipeId = queryParams.get('recipeId');
            await renderRecipeForEdit(recipeId);
        }
        else {
            console.error("No recipeId found in query params or incorrect query params");
            console.info("Switching to create recipe mode")
        }
    }
};

const renderRecipeForEdit = async (recipeId) => {
    try {
        const recipe = await getRecipeById(recipeId);
        console.info("Editing recipe with ID:", recipeId);
        editMode = true;
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
            console.info("Recipe with id: ", recipeId, "updated successfully");
        }
        else {
            await addRecipe(new Recipe(title, description, ingredients, instructions));
            console.info("Recipe created successfully:");
        }
        
        window.location.href = '/components/protected/my_recipes.html';
        recipeForm.reset();
    }
    catch (error) {
        console.error("Error during recipe creation:", error?.message);
        return;
    }
});

onload();
