const mysql = require('mysql');

const pool  = mysql.createPool({
    connectionLimit: 10,
    host: "your_hostname",
    user: "your_username",
    password: "your_password",
    database: "your_database"
});

module.exports = pool;
