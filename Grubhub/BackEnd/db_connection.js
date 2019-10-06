const mysql = require('mysql2');

// create the connection to database
var connection = mysql.createConnection({
    // connectionLimit: 10,
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Ccompiler7!',
    database: 'grubhub',
    dateStrings: true
});
connection.connect((err, res) => {
    if(err) console.log("DB connection failed!!!");
    else {
        console.log("DB connection successful!!!");
    } 
});
connection.query("SET FOREIGN_KEY_CHECKS=0");
module.exports = connection;