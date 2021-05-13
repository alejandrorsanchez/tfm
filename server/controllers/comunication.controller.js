const addController = {};
const db = require('../database');

addController.findByBothUserId = (req, res) => {
    const userId1 = req.query.userId1;
    const userId2 = req.query.userId2;
    const query = 'SELECT messages FROM comunications WHERE userId1 = ? and userId2 = ?';
    db.query(query, [userId1, userId2], function (err, row, fields) {
        if (err) throw err;
        res.status(200).json(row[0].messages);
    });
}

module.exports = addController;
