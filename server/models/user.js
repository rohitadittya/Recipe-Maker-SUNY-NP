const db = require('../config/db_connect');

const fetchAllUsers = async () => {
    const sql = `SELECT * FROM USER`;
    return await db.query(sql, []);
};

const fetchUser = async (email) => {
    const sql = `SELECT * FROM USER WHERE Email=?`;
    return await db.query(sql, [email]);
};

const fetchUserById = async (userId) => {
    const sql = `SELECT * FROM USER WHERE UserId=?`;
    return await db.query(sql, [userId]);
};

const addUser = async (username, firstname, lastname, email, password) => {
    const sql = `INSERT INTO USER (UserName, Firstname, Lastname, Email, Password) VALUES (?, ?, ?, ?, ?)`;
    return await db.query(sql, [username, firstname, lastname, email, password]);
};

const removeUser = async (email) => {
    const sql = `DELETE FROM USER WHERE Email=?`;
    return await db.query(sql, [email]);
};

const updateUser = async (userId, username, firstname, lastname, email, password) => {
    const sql = `UPDATE USER SET UserName=?, Firstname=?, Lastname=?, Email=?, Password=? WHERE UserId=?`;
    return await db.query(sql, [username, firstname, lastname, email, password, userId]);
};

module.exports = {
    fetchUser,
    addUser,
    removeUser,
    updateUser,
    fetchAllUsers,
    fetchUserById
};