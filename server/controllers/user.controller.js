const userController = {};
const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secretkey';

userController.getUsers = (req, res) => {
    db.query('SELECT * FROM test', function (err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    })
}

userController.save = (req, res) => {
    const BCRYPT_SALT_ROUNDS = 12;
    const password = req.body.password;
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
        .then(function(hash){
            const user = req.body;
            user.password = hash;
            const query = 'INSERT INTO users SET ?';
            db.query(query, user, function (err, rows, fields) {
                if (err) throw err;
                res.json({ message: 'Usuario creado correctamente!' });
            })
        })
        .catch(function(error){
           console.log('Error saving user');
           next();
        });
}

userController.findByUsername = (req, res) => {
    const username = req.params.username;
    db.query('SELECT * FROM users WHERE username = ?', [username], function (err, row, fields) {
        if (err) throw err;
        res.json(row);
    })
}

userController.getUser = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    db.query('SELECT * FROM users WHERE username = ?', [username], function (err, row, fields) {
        if (err) throw err;
        if(row[0]){
            const user = row[0];
            bcrypt.compare(password, user.password, function(err, res){
                if(err) throw err;
                console.log(res);
                if(res) {
                    let validTime = 60 * 15;
                    let myToken = jwt.sign({"username":username, "password":password}, SECRET_KEY, {expiresIn: validTime});
                    res.json(myToken);
                }
            });
        }
    })
}

module.exports = userController;
