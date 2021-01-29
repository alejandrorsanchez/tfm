const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'project_master',
    password : 'project_master',
    database : 'project_master'
});

connection.connect(function(err) {
    if (err){
        throw err;
    }
    console.log('BD connected');
});

module.exports = connection;
