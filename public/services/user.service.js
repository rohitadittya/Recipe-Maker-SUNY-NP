import { httpClient } from "../utils/api.js";
import { SESSION_STORAGE_KEYS } from "../utils/util.js";

const baseUrl = "/user";

const setSessionStorage = (user) => {
    window.sessionStorage.setItem(SESSION_STORAGE_KEYS.LOGGED_IN_USER, JSON.stringify(user));
    window.sessionStorage.setItem(SESSION_STORAGE_KEYS.JWT_TOKEN, user.authToken);
}

const removeSessionStorage = () => {
    window.sessionStorage.removeItem(SESSION_STORAGE_KEYS.LOGGED_IN_USER);
    window.sessionStorage.removeItem(SESSION_STORAGE_KEYS.JWT_TOKEN);
};

const isJWTTokenExpired = () => {
    const token = window.sessionStorage.getItem(SESSION_STORAGE_KEYS.JWT_TOKEN) || null;
    if (token) {
        const payloadBase64 = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        const exp = decodedPayload.exp;
        const now = Math.floor(Date.now() / 1000);
        return exp < now;
    }

    return true;
}

export const isUserLoggedIn = () => {
    isJWTTokenExpired() && removeSessionStorage();
    return (window.sessionStorage.getItem(SESSION_STORAGE_KEYS.LOGGED_IN_USER) && true) || false;
}

export const getLoggedInUser = () => {
    isJWTTokenExpired() && removeSessionStorage();
    const loggedInUser = window.sessionStorage.getItem(SESSION_STORAGE_KEYS.LOGGED_IN_USER) || false;
    return loggedInUser ? JSON.parse(loggedInUser) : null;
}

export const authGuard = () => {
    isJWTTokenExpired() && logoutUser(true);
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

export const logoutUser = (showUnAuthErrMsg=false) => {
    if (showUnAuthErrMsg) {
        console.error("Auth Guard: Unauthorized access to protected route");
    }
    removeSessionStorage();
    window.location.href = '/components/login.html';
}
