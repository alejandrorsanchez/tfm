const userController = {};
const db = require('../database');

userController.getUsers = (req, res) => {
    db.query('SELECT * FROM test', function (err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    })
}

module.exports = userController;
