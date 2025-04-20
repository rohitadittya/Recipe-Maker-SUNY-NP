import Recipe from "../model/recipe.js";
import { addRecipe } from "../services/recipe.service.js";
import { SESSION_STORAGE_KEYS } from "./util.js";

const recipeForm = document.getElementById('postRecipeForm');
const logout_anchor = document.getElementById('logout_anchor');
const loggedInUser = window.sessionStorage.getItem(SESSION_STORAGE_KEYS.LOGGED_IN_USER) || false;

const onload = () => {
    if (!loggedInUser) {
        window.alert("You are not logged in. Please login to continue.");
        window.location.href = '/public/components/login.html';
        return;
    }
    window.alert(`Hi ${loggedInUser}, Welcome to the recipe app!`)
    console.log("LOGGED IN User ", loggedInUser);
};

recipeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const ingredients = document.getElementById("ingredients").value;
    const instructions = document.getElementById("instructions").value;

    // service function to create a recipe - which later handles the API call
    const recipe = addRecipe(new Recipe(title, description, ingredients, instructions));
    console.log("Recipe created", recipe);
    recipeForm.reset();
});

logout_anchor.addEventListener('click', (e) => {
    e.preventDefault();
    window.sessionStorage.removeItem(SESSION_STORAGE_KEYS.LOGGED_IN_USER);
    window.location.href = '/public/components/login.html';
});

onload();
