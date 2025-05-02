require('dotenv').config();
const mysql = require('mysql2');

const sql = require('../sql/recipemaker.sql');

const dbProperties = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PSWD,
  multipleStatements: true,
};

let con = mysql.createPool(dbProperties);

const query = (sql, binding) => {
  return new Promise((resolve, reject) => {
    con.query(sql, binding, (err, result, fields) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

const reconnectWithDatabase = () => {
  con.end(); // Close the existing pool
  con = mysql.createPool({
    ...dbProperties,
    database: 'recipegram',
  });
};


const initializeDb = async () => {
  try {
    await query(sql, []);
    reconnectWithDatabase();
    console.log('Database setup complete.');
  }
  catch (error) {
    console.error('Error setting up database:', error);
  }
};

initializeDb();

module.exports = { con, query };