const mysql = require('mysql2');

// create the connection to database
var connection = mysql.createPool({
    connectionLimit: 10,
    host: 'grubhub-db.cmmdmyrzolij.us-east-2.rds.amazonaws.com',
    port: '3306',
    user: 'snayakk',
    password: 'grubqwerty',
    database: 'grubhub',
    dateStrings: true
});
// var connection = mysql.createPool({
    // connectionLimit: 10,
    // host: 'localhost',
    // port: '3306',
    // user: 'root',
    // password: 'Ccompiler7!',
    // database: 'grubhub',
    // dateStrings: true
// });
connection.query("SET FOREIGN_KEY_CHECKS=0", (err, res)=> {
    if(err) console.log("DB connection failed!!!");
    else {
        console.log("DB connection successful!!!");
    } 
});
module.exports = connection;