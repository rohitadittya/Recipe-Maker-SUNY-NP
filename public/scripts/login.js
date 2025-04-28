import { loginUser } from "../services/user.service.js";

const loginForm = document.getElementById("loginForm");


loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await loginUser(email, password);
        window.location.href = '/components/post_recipe.html';
        return;
    }
    catch (error) {
        console.error("Error during login:", error?.message);
        return;
    }
});