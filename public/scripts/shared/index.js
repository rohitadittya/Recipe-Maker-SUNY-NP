import { authGuard, logoutUser } from "../../services/user.service.js";
import { initializeNavbar } from "./navbar.js";

const authGuardForProtectedRoutes = () => {
    if (window.location.pathname.includes("/components/protected/")) {
        authGuard(); //check if the user is logged in and jwt token not expired; else redirect to login page
    }
};

const addLogoutHandler = () => {
    const logoutAnchor = document.getElementById("logout_anchor");
    if (logoutAnchor) {
        logoutAnchor.addEventListener("click", (e) => {
            e.preventDefault();
            logoutUser();
        });
    }
};

const addNavbarActiveClass = () => {
    const links = document.querySelectorAll(".nav-link");
    const currentPath = window.location.pathname;

    links.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath) {
            link.classList.add("active");
        }
    });
};

window.addEventListener("DOMContentLoaded", () => {
    authGuardForProtectedRoutes();
    addLogoutHandler();
    addNavbarActiveClass();
});

initializeNavbar();