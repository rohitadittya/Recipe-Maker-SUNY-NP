const db = require('../config/db_connect');

const fetchUser = async (email) => {
    const sql = `SELECT * FROM USER WHERE Email=?`;
    return await db.query(sql, [email]);
};

const addUser = async (username, firstname, lastname, email, password) => {
    const sql = `INSERT INTO USER (UserName, Firstname, Lastname, Email, Password) VALUES (?, ?, ?, ?, ?)`;
    return await db.query(sql, [username, firstname, lastname, email, password]);
};

const removeUser = async (email) => {
    const sql = `DELETE FROM USER WHERE Email=?`;
    return await db.query(sql, [email]);
};

module.exports = {
    fetchUser,
    addUser,
    removeUser
};