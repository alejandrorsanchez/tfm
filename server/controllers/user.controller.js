const userController = {};
const db = require('../database');
const bcrypt = require('bcrypt');

userController.getUsers = (req, res) => {
    db.query('SELECT * FROM test', function (err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    })
}

userController.postUser = (req, res) => {
    const BCRYPT_SALT_ROUNDS = 12;
    const password = req.body.password;
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
        .then(function(hash){
            const user = req.body;
            user.password = hash;
            const query = 'INSERT INTO users SET ?';
            db.query(query, user, function (err, rows, fields) {
                if (err) throw err;
                res.send('User created');
            })
        })
        .catch(function(error){
           console.log('Error saving user');
           next();
        });
}

module.exports = userController;
