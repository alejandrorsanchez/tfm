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
                res.status(200).json({ message: 'Usuario creado correctamente!', id: rows['insertId']});
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
        (row[0]) ? res.status(200).json(row[0]) : res.status(404).json({message: 'Usuario no encontrado'});
    });
}

userController.findByUsername = (req, res) => {
    const username = req.params.username;
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], function (err, row, fields) {
        if (err) throw err;
        (row[0]) ? res.status(409).json({message: 'Ese usuario ya existe'}) : res.status(200).send();
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
                    res.status(200).json({token: myToken, id: user.id});
                }else{
                    res.status(400).json({message: 'La contraseña es incorrecta'});
                }
            });
        }else{
            res.status(404).json({message: 'Ese usuario no existe'});
        }
    })
}

userController.update = (req, res) => {
    const id = req.params.id;
    const data = [req.body.address, req.body.description, req.body.email, id];
    const query = 'UPDATE users SET address = ?, description = ?, email = ? WHERE id = ?';
    db.query(query, data, function (err, row, fields) {
        if (err) throw err;
        res.status(200).json({ message: 'Usuario actualizado', affectedRows: row['affectedRows']});
    })
}

userController.delete = (req, res) => {
    const id = req.params.id;
    const queryDeleteUserChats = 'DELETE FROM comunications WHERE userId1 = ? or userId2 = ?';
    db.query(queryDeleteUserChats, [id, id], function (err, row, fields) {
        if (err) throw err;
    });
    const queryDeleteUserAdds = 'DELETE FROM adds WHERE userId = ?';
    db.query(queryDeleteUserAdds, [id], function (err, row, fields) {
        if (err) throw err;
    });
    const queryDeleteUser = 'DELETE FROM users WHERE id = ?';
    db.query(queryDeleteUser, [id], function (err, row, fields) {
        if (err) throw err;
    });
    const queryFindUserPets = 'SELECT id FROM pets WHERE user_id = ?';
    db.query(queryFindUserPets, [id], function (err, rows) {
        if (err) throw err;
        deletePetsImages(rows);
        const queryDeletePets = 'DELETE FROM pets WHERE user_id = ?';
        db.query(queryDeletePets, [id], function (error) {
            if (error) throw error;
        });
    });
    res.status(200).send();
}

function deletePetsImages(rows) {
    for (const row of rows) {
        rimraf.sync('./uploads/' + row['id']);
    }
}

module.exports = userController;
