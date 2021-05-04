const userController = {};
const db = require('../database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const env = require('../enviroment');
const rimraf = require("rimraf");

userController.save = (req, res) => {
    const BCRYPT_SALT_ROUNDS = 12;
    bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS)
        .then(function(hash){
            let user = req.body;
            user.password = hash;
            const query = 'INSERT INTO users SET ?';
            db.query(query, user, function (err, rows, fields) {
                if (err) res.status(422).send();
                res.json({ message: 'Usuario creado correctamente!', id: rows['insertId']});
            })
        })
        .catch(function(error){
           console.log('Error saving user' + error);
           next();
        });
}
userController.findById = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [id], function (err, row, fields) {
        if (err) throw err;
        res.json(row);
    })
}

userController.findByUsername = (req, res) => {
    const username = req.params.username;
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], function (err, row, fields) {
        if (err) throw err;
        res.json(row);
    })
}

userController.getUser = (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], function (err, row, fields) {
        if (err) throw err;
        if(row[0]){
            const user = row[0];
            bcrypt.compare(password, user.password, function(error, result){
                if(error) throw error;
                if(result) {
                    const validTime = 60 * 15;
                    const myToken = jwt.sign({"username":username, "password":password}, env.SECRET_KEY, {expiresIn: validTime});
                    res.json({token: myToken, id: user.id});
                }else{
                    res.status(404).json({message: 'La contraseña es incorrecta'});
                }
            });
        }else{
            res.status(404).json({message: 'Ese usuario no existe'});
        }
    })
}

userController.update = (req, res) => {
    const id = req.params.id;
    const data = [req.body.address, req.body.description, id];
    const query = 'UPDATE users SET address = ?, description = ? WHERE id = ?';
    db.query(query, data, function (err, row, fields) {
        if (err) throw err;
        res.json({ message: 'Usuario actualizado'});
    })
}

userController.delete = (req, res) => {
    const id = req.params.id;
    const queryDeleteUser = 'DELETE FROM users WHERE id = ?';
    db.query(queryDeleteUser, [id], function (err, row, fields) {
        if (err) throw err;
        const queryFindUserPets = 'SELECT id FROM pets WHERE user_id = ?';
        db.query(queryFindUserPets, [id], function (err, rows) {
            if (err) throw err;
            deletePetsImages(rows);
            const queryDeletePets = 'DELETE FROM pets WHERE user_id = ?';
            db.query(queryDeletePets, [id], function (err, rows) {
                if (err) throw err;
                res.status(200).send();
            })
        })
    })
}

function deletePetsImages(rows) {
    for (const row of rows) {
        rimraf.sync(env.FILES_LOCATION + row['id']);
    }
}

module.exports = userController;
