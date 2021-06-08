const petController = {};
const db = require('../database');
const fileController = require('./file.controller');
const fs = require('fs');
const path = require('path');


petController.findById = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM pets WHERE id = ?';
    db.query(query, [id], function (err, row, fields) {
        if (err) throw err;
        (row[0]) ? res.status(200).json(row[0]) : res.status(404).json({message: 'Mascota no encontrada'});
    })
}

petController.findByUserId = (req, res) => {
    const userId = req.params.userId;
    const query = 'SELECT * FROM pets WHERE userId = ?';
    db.query(query, [userId], function (err, rows, fields) {
        if (err) throw err;
        res.status(200).json(rows);
    })
}

petController.save = (req, res) => {
    const pet = req.body;
    const query = 'INSERT INTO pets SET ?';
    db.query(query, pet, function (err, rows, fields) {
        if (err) throw err;
        res.status(200).json({ message: 'Mascota creada correctamente!', id: rows['insertId']});
    })
}

petController.update = (req, res) => {
    const id = req.params.id;
    let data = [req.body.name, req.body.breed, req.body.weight, req.body.age, req.body.description, req.body.picture, id];
    const query = 'UPDATE pets SET name = ?, breed = ?, weight = ?, age = ?, description = ?, picture = ? WHERE id = ?';
    db.query(query, data, function (err, row, fields) {
        if (err) throw err;
        if(row['affectedRows'] > 0) res.status(200).json({ message: 'Mascota actualizada'});
        else res.status(404).json({message: 'Esa mascota no existe'});
    })
}

petController.delete = (req, res) => {
    const id = req.params.id;
    const queryDeleteAdds = 'DELETE FROM adds WHERE petId = ?';
    db.query(queryDeleteAdds, [id], function (err, row, fields) {
        if (err) throw err;
    });
    const queryDeletePet = 'DELETE FROM pets WHERE id = ?';
    db.query(queryDeletePet, [id], function (err, row, fields) {
        if (err) throw err;
        if(row['affectedRows'] === 0){
            res.status(404).json({message: 'Esa mascota no existe'});
        }else{
            fileController.removeAllFiles(id);
            res.status(200).send();
        }
    });
}

petController.uploadPhoto = (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const reqPath = __basedir + '/uploads';
    const resolvedPath = path.resolve(reqPath);
    if (resolvedPath.startsWith(__basedir) && !isNaN(parseInt(id))) {
        if(!fs.existsSync(resolvedPath + '/' + id)){
            fileController.createDirectory(resolvedPath, id);
        }
        fileController.deleteFilesFromDirectory(resolvedPath + '/' + id);
        fileController.copyFileAndDeleteFromOrigin(resolvedPath,resolvedPath + '/' + id, name);
        res.json({ message: 'Imagen guardada' });
    }
}

module.exports = petController;
