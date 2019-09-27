const mysql = require('mysql2');

// create the connection to database
var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'Ccompiler7!',
    database: 'grubhub'
});
connection.connect((err) => {
    if(err) console.log('Connection to DB failed!!' , err) ;
    else console.log('Connection successful to DB!!');
});
module.exports = connection;