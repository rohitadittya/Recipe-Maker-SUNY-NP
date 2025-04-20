import User from "../model/user.js";
import { registerUser } from "../services/user.service.js";


const registerForm = document.getElementById("registerForm");

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // service function to register user - which later handles the API call
    const user = registerUser(new User(firstname, lastname, email, password));
    console.log("User created",user);
    window.alert("User created successfully. Please login to continue.");
    window.location.href = '/public/components/login.html';
});