import { SESSION_STORAGE_KEYS } from "../scripts/util.js";

let users = [];

const setUsers = () => {
    users = window.sessionStorage.getItem(SESSION_STORAGE_KEYS.USERS) ?
        JSON.parse(window.sessionStorage.getItem(SESSION_STORAGE_KEYS.USERS)) : [];
}

export const loginUser = (email, password) => {
    setUsers();
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        window.sessionStorage.setItem(SESSION_STORAGE_KEYS.LOGGED_IN_USER, user.firstname);
        return user;
    }
    return null;
}

export const registerUser = (user) => {
    setUsers();
    users.push(user);
    window.sessionStorage.setItem(SESSION_STORAGE_KEYS.USERS, JSON.stringify(users));
    return user;
}
