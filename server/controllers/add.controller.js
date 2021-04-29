const addController = {};
const db = require('../database');

addController.saveAdoption = (req, res) => {
    const add = req.body;
    const querySelect = 'SELECT id FROM adds WHERE userId = ? and petId = ?';
    db.query(querySelect, [add.userId, add.petId], function (err, rows, fields) {
        if (err) throw err;
        if(rows.length > 0){
            res.status(409).json({message: 'Ya has publicado este anuncio'});
        }else{
            const query = 'INSERT INTO adds SET ?';
            db.query(query, add, function (err, rows, fields) {
                if (err) throw err;
                res.status(200).json({message: 'Anuncio publicado correctamente!', id: rows['insertId']});
            })
        }
    })
}

addController.saveVolunteer = (req, res) => {
    const add = req.body;
    const querySelect = 'SELECT id FROM adds WHERE userId = ? and petId is NULL';
    db.query(querySelect, [add.userId], function (err, rows, fields) {
        if (err) throw err;
        if(rows.length > 0){
            res.status(409).json({message: 'Ya has publicado este anuncio'});
        }else{
            const query = 'INSERT INTO adds SET ?';
            db.query(query, add, function (err, rows, fields) {
                if (err) throw err;
                res.status(200).json({message: 'Anuncio publicado correctamente!', id: rows['insertId']});
            })
        }
    })
}

module.exports = addController;
