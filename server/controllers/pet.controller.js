const petController = {};
const db = require('../database');
const fs = require('fs');
const path = require('path');
const rimraf = require("rimraf");

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
        res.status(200).json({ message: 'Mascota actualizada', affectedRows: row['affectedRows']});
    })
}

petController.delete = (req, res) => {
    const id = req.params.id;
    const queryDeletePet = 'DELETE FROM pets WHERE id = ?';
    db.query(queryDeletePet, [id], function (err, row, fields) {
        if (err) throw err;
        rimraf.sync('./uploads/' + id);
    })
    const queryDeleteAdds = 'DELETE FROM adds WHERE petId = ?';
    db.query(queryDeleteAdds, [id], function (err, row, fields) {
        if (err) throw err;
    })
    res.status(200).send();
}

petController.uploadPhoto = (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const reqPath = __basedir + '/uploads';
    const resolvedPath = path.resolve(reqPath);
    if (resolvedPath.startsWith(__basedir)) {
        if(!fs.existsSync(resolvedPath + '/' + id)){
            fs.mkdir(resolvedPath + '/' + id,function(err){
                if (err) return console.error(err);
                console.log("Directory created successfully!");
            });
        }
        deleteFilesFromDirectory(resolvedPath + '/' + id);
        copyFileAndDeleteFromOrigin(resolvedPath,resolvedPath + '/' + id, name);
        res.json({ message: 'Imagen guardada' });
    }
}

function copyFileAndDeleteFromOrigin(origin, destination, name){
    fs.copyFile(origin + "/" + name,destination+"/" + name,(error) => {
        if(error) console.log(error);
        else removeFile(origin, name);
    })
}
function removeFile(directory, name){
    fs.unlink(directory + "/" + name,(error)=> {
        if(error) console.log("error al eliminar");
        else console.log("OK");
    })
}

function deleteFilesFromDirectory(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            fs.unlink(path.join(directory, file), error => {
                if (error) throw error;
            });
        }
        /*fs.rmdir(directory, function(err) {
            if (err) throw err
        })*/
    });
}

module.exports = petController;
