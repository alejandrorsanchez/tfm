const petController = {};
const db = require('../database');

petController.findByUserId = (req, res) => {
    const userId = req.params.userId;
    db.query('SELECT * FROM pets WHERE user_id = ?', [userId], function (err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    })
}

module.exports = petController;
