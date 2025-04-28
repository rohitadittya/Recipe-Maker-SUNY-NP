const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ERROR_MESSAGES = {
    EMAIL_NOT_VALID: 'Email is not valid',
    PASSWORD_NOT_VALID: 'Password must be at least 8 characters long',
    F_NAME_NOT_VALID: 'First name must be at least 2 characters long',
    L_NAME_NOT_VALID: 'Last name must be at least 2 characters long',
};

export const SESSION_STORAGE_KEYS = {
    USERS: 'users',
    LOGGED_IN_USER: 'loggedInUser',
    JWT_TOKEN: 'JWT_TOKEN'
};

export const isValidEmail = (email) => {
    return EMAIL_REGEX.test(email);
};

export const isValidPassword = (password) => {
    return password.length >= 8;
};

export const isValidFirstName = (firstName) => {
    return firstName.length >= 2;
};

export const isValidLastName = (lastName) => {
    return lastName.length >= 2;
};
