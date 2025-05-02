import User from "../model/user.js";
import { registerUser } from "../services/user.service.js";


const registerForm = document.getElementById("registerForm");

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await registerUser(new User(username, firstname, lastname, email, password));
        window.location.href = '/components/protected/post_recipe.html';
        return;
    }
    catch (error) {
        console.error("Error during registration:", error?.message);
        return;
    }
});