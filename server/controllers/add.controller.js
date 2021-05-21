const addController = {};
const db = require('../database');

addController.saveAdoption = (req, res) => {
    const add = req.body;
    const querySelect = 'SELECT id FROM adds WHERE userId = ? and petId = ?';
    db.query(querySelect, [add.userId, add.petId], function (err, row) {
        if (err) throw err;
        if(row.length > 0){
            res.status(409).json({message: 'Ya has publicado este anuncio'});
        }else{
            const query = 'INSERT INTO adds SET ?';
            db.query(query, add, function (error, rows) {
                if (error) throw error;
                res.status(200).json({message: 'Anuncio publicado correctamente!', id: rows['insertId']});
            })
        }
    })
}
addController.saveVolunteer = (req, res) => {
    const add = req.body;
    const querySelect = 'SELECT id FROM adds WHERE userId = ? and petId is NULL';
    db.query(querySelect, [add.userId], function (err, row) {
        if (err) throw err;
        if(row.length > 0){
            res.status(409).json({message: 'Ya has publicado este anuncio'});
        }else{
            const queryInsert = 'INSERT INTO adds SET ?';
            db.query(queryInsert, add, function (error, rows) {
                if (error) throw error;
                res.status(200).json({message: 'Anuncio publicado correctamente!', id: rows['insertId']});
            })
        }
    })
}

addController.findByType = (req, res) => {
    const type = req.query.type;
    const userId = req.query.userId;
    let query;
    if(type === '1') query = 'SELECT * FROM adds WHERE userId != ? and petId is not null';
    else query = 'SELECT * FROM adds WHERE userId != ? and petId is NULL';
    db.query(query, [userId], function (err, rows) {
        if (err) throw err;
        if(rows.length === 0){
            res.status(404).json({message: 'No hay anuncios disponibles'});
        }else{
            res.status(200).json(rows);
        }
    })
}

addController.findByUserId = (req, res) => {
    const userId = req.params.userId;
    const query = 'SELECT * FROM adds WHERE userId = ?';
    db.query(query, [userId], function (err, rows) {
        if (err) throw err;
        res.status(200).json(rows);
    });
}

addController.delete = (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM adds WHERE id = ?';
    db.query(query, [id], function (err, row) {
        if (err) throw err;
        res.status(200).send();
    });
}

module.exports = addController;
