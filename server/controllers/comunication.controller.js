const comunicationController = {};
const db = require('../database');

comunicationController.findByUserId1AndUserId2AndType = (req, res) => {
    const userId1 = req.query.userId1;
    const userId2 = req.query.userId2;
    const type = req.query.type;
    const query = 'SELECT * FROM comunications WHERE type = ? and userId1 IN (?, ?) and userId2 IN (?, ?)';
    db.query(query, [type, userId1, userId2, userId1, userId2], function (err, row, fields) {
        if (err) throw err;
        (row[0]) ? res.status(200).json(row[0]) : res.status(404).json({message: 'Chat no encontrado'});
    });
}

comunicationController.findByUserId = (req, res) => {
    const userId = req.params.userId;
    const query = 'SELECT * FROM comunications WHERE userId1 = ? or userId2 = ?';
    db.query(query, [userId, userId], function (err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows);
    });
}

comunicationController.save = (req, res) => {
    const comunication = req.body;
    const querySelect = 'SELECT * FROM comunications WHERE type = ? and userId1 IN (?, ?) and userId2 IN (?, ?)';
    db.query(querySelect, [comunication.type, comunication.userId1, comunication.userId2, comunication.userId1, comunication.userId2], function (err, row) {
        if (err) throw err;
        if(row.length > 0){
            res.status(409).json({message: 'Ya existe un chat entre vosotros'});
        }else{
            const queryInsert = 'INSERT INTO comunications SET ?';
            db.query(queryInsert, comunication, function (error, rows) {
                if (error) throw error;
                res.status(200).json({id: rows['insertId']});
            });
        }
    });
}

comunicationController.update = (req, res) => {
    const data = [req.body.messages, req.body.notification, req.params.id];
    const query = 'UPDATE comunications SET messages = ?, notification = ? WHERE id = ?';
    db.query(query, data, function (err, row, fields) {
        if (err) throw err;
        res.status(200).json({affectedRows: row['affectedRows']});
    });
}

comunicationController.delete = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM comunications WHERE id = ?';
    db.query(query, [id], function (err, row, fields) {
        if (err) throw err;
        res.status(200).send();
    });
}

module.exports = comunicationController;
