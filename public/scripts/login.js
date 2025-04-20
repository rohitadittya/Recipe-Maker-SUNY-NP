import { loginUser } from "../services/user.service.js";

const loginForm = document.getElementById("loginForm");


loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // service function to fetch the user - which later handles the API call
    const user = loginUser(email, password);
    if(!user) {
        console.error("No user found with the given credentials. Please try again.");
        window.alert("No user found with the given credentials. Please try again.");
        return;
    }
    window.location.href = '/public/components/post_recipe.html';
});