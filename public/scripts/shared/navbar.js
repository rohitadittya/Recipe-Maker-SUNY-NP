import { isUserLoggedIn, logoutUser } from "../../services/user.service.js";

export const initializeNavbar = () => {
    const userLoggedIn = isUserLoggedIn();

    const body = document.querySelector('body');
    const div = document.createElement('div');
    div.classList.add('navbar');
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');

    ul.innerHTML = ``;

    if (!userLoggedIn) {
        // if the user is not logged in,
        ul.innerHTML = `
            <li><img class="logo" src="/assets/images/logo.jpeg" /></li>
            <li><a class="nav-link" href="/components/login.html">Login</a></li>
            <li><a class="nav-link" href="/components/register.html">Register</a></li>
            <li><a class="nav-link" href="/components/protected/post_recipe.html">Post a recipe</a></li>
            `;
    }
    else {
        // Protected routes
        ul.innerHTML = `
            <li><img class="logo" src="/assets/images/logo.jpeg" /></li>
            <li><a class="nav-link" href="/components/protected/post_recipe.html">Post a recipe</a></li>
            <li><a class="nav-link" href="/components/protected/my_recipes.html">My recipes</a></li>
            <li><a class="nav-link" href="/components/protected/recipe_feed.html">Feed</a></li>
            <li><a href="#" id="logout_anchor">Logout</a></li>
            `;
    }

    nav.appendChild(ul);
    div.appendChild(nav);
    body.prepend(div);
};

// initializeNavbar();