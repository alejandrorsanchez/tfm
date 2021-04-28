const env = require('./enviroment');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : env.HOST,
    user     : env.USER,
    password : env.PASSWORD,
    database : env.DATABASE
});

connection.connect(function(err) {
    if (err){
        throw err;
    }
    console.log('BD connected');
});

module.exports = connection;
