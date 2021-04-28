const userController = {};
const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../enviroment');
const rimraf = require("rimraf");

userController.save = (req, res) => {
    const BCRYPT_SALT_ROUNDS = 12;
    const password = req.body.password;
    bcrypt.hash(password, BCRYPT_SALT_ROUNDS)
        .then(function(hash){
            const user = req.body;
            user.password = hash;
            const query = 'INSERT INTO users SET ?';
            db.query(query, user, function (err, rows, fields) {
                if (err) res.status(422).send();
                res.json({ message: 'Usuario creado correctamente!', id: rows['insertId']});
            })
        })
        .catch(function(error){
           console.log('Error saving user');
           next();
        });
}
userController.findById = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM users WHERE id = ?', [id], function (err, row, fields) {
        if (err) throw err;
        res.json(row);
    })
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
            bcrypt.compare(password, user.password, function(err, result){
                if(err) throw err;
                if(result) {
                    let validTime = 60 * 15;
                    let myToken = jwt.sign({"username":username, "password":password}, env.SECRET_KEY, {expiresIn: validTime});
                    res.json({token: myToken, id: user.id});
                }
            });
        }else{
            res.status(404).send();
        }
    })
}

userController.update = (req, res) => {
    const id = req.params.id;
    let data = [req.body.address, req.body.description, id];
    db.query('UPDATE users SET address = ?, description = ? WHERE id = ?', data, function (err, row, fields) {
        if (err) throw err;
        res.json({ message: 'Usuario actualizado' });
    })
}

userController.delete = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM users WHERE id = ?', [id], function (err, row, fields) {
        if (err) throw err;
        db.query('SELECT id FROM pets WHERE user_id = ?', [id], function (err, rows, fields) {
            if (err) throw err;
            for (const row of rows) {
                rimraf.sync("./server/uploads/" + row['id']);
            }
            db.query('DELETE FROM pets WHERE user_id = ?', [id], function (err, rows, fields) {
                if (err) throw err;
                res.status(200).send();
            })
        })
    })
}

module.exports = userController;
