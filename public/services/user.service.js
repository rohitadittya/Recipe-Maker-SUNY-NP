import { httpClient } from "../utils/api.js";
import { SESSION_STORAGE_KEYS } from "../utils/util.js";

const baseUrl = "/user";

const setSessionStorage = (user) => {
    window.sessionStorage.setItem(SESSION_STORAGE_KEYS.LOGGED_IN_USER, JSON.stringify(user));
    window.sessionStorage.setItem(SESSION_STORAGE_KEYS.JWT_TOKEN, user.authToken);
}

const isJWTTokenExpired = () => {
    const token = window.sessionStorage.getItem(SESSION_STORAGE_KEYS.JWT_TOKEN) || null;
    if (token) {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        const exp = decodedPayload.exp;
        const now = Math.floor(Date.now() / 1000);
        console.log("exp", exp < now)
        return exp < now;
    }

    return true;
}

export const isUserLoggedIn = () => {
    isJWTTokenExpired();
    const loggedInUser = window.sessionStorage.getItem(SESSION_STORAGE_KEYS.LOGGED_IN_USER) || false;
    return loggedInUser ? true : false;
}

export const getLoggedInUser = () => {
    isJWTTokenExpired();
    const loggedInUser = window.sessionStorage.getItem(SESSION_STORAGE_KEYS.LOGGED_IN_USER) || false;
    return loggedInUser ? JSON.parse(loggedInUser) : null;
}

export const authGuard = () => {
    isJWTTokenExpired() && logoutUser();
}

export const loginUser = async (email, password) => {
    const user = await httpClient(`${baseUrl}/login`, "POST", { email, password });
    if (user) {
        setSessionStorage(user);
        return user;
    }
}

export const registerUser = async (userObj) => {
    const user = await httpClient(`${baseUrl}/register`, "POST", userObj);
    if (user) {
        setSessionStorage(user);
        return user;
    }
}

export const logoutUser = () => {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEYS.LOGGED_IN_USER);
    window.sessionStorage.removeItem(SESSION_STORAGE_KEYS.JWT_TOKEN);
    window.location.href = '/components/login.html';
}
