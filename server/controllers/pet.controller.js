const petController = {};
const db = require('../database');

petController.findByUserId = (req, res) => {
    const userId = req.params.userId;
    db.query('SELECT * FROM pets WHERE user_id = ?', [userId], function (err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    })
}

petController.delete = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM pets WHERE id = ?', [id], function (err, row, fields) {
        if (err) throw err;
        res.status(200).send();
    })
}

petController.uploadPhoto = (req, res) => {
    res.status(200).send();
}

module.exports = petController;
