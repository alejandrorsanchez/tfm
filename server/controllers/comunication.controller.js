const comunicationController = {};
const db = require('../database');

comunicationController.findByBothUserId = (req, res) => {
    const userId1 = req.query.userId1;
    const userId2 = req.query.userId2;
    const query = 'SELECT * FROM comunications WHERE userId1 = ? and userId2 = ?';
    db.query(query, [userId1, userId2], function (err, row, fields) {
        if (err) throw err;
        res.status(200).json(row[0]);
    });
}

comunicationController.save = (req, res) => {
    const comunication = req.body;
    const query = 'INSERT INTO comunications SET ?';
    db.query(query, comunication, function (err, rows, fields) {
        if (err) throw err;
        res.status(200).json({id: rows['insertId']});
    })
}

module.exports = comunicationController;
