const petController = {};
const db = require('../database');
const fs = require('fs');
const path = require('path');
const rimraf = require("rimraf");

petController.findByUserId = (req, res) => {
    const userId = req.params.userId;
    db.query('SELECT * FROM pets WHERE user_id = ?', [userId], function (err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    })
}

petController.save = (req, res) => {
    const pet = req.body;
    const query = 'INSERT INTO pets SET ?';
    db.query(query, pet, function (err, rows, fields) {
        if (err) throw err;
        res.json({ message: 'Mascota creada correctamente!', id: rows['insertId']});
    })
}

petController.update = (req, res) => {
    const id = req.params.id;
    let data = [req.body.name, req.body.breed, req.body.weight, req.body.age, req.body.description, req.body.picture, id];
    db.query('UPDATE pets SET name = ?, breed = ?, weight = ?, age = ?, description = ?, picture = ? WHERE id = ?', data, function (err, row, fields) {
        if (err) throw err;
        res.json({ message: 'Mascota actualizada' });
    })
}

petController.delete = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM pets WHERE id = ?', [id], function (err, row, fields) {
        if (err) throw err;
        res.status(200).send();
        rimraf.sync("./server/uploads/" + id);
        //eliminarDirectorio('./server/uploads/' + id);
    })
}

petController.uploadPhoto = (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    if(!fs.existsSync("./server/uploads/" + id)){
        fs.mkdir("./server/uploads/" + id,function(err){
            if (err) return console.error(err);
            console.log("Directory created successfully!");
        });
    }
    copiar("./server/uploads","./server/uploads/" + id, name);
    res.json({ message: 'Imagen guardada' });
}

function copiar(ruta, rutaNueva, nombre){
    fs.copyFile(ruta+ "/"+nombre,rutaNueva+"/"+nombre,(error) => {
        if(error) console.log(error);
        else eliminar(ruta,nombre);
    })
}
function eliminar(ruta,nombre){
    fs.unlink(ruta+"/"+nombre,(error)=> {
        if(error) console.log("error al eliminar");
        else console.log("OK");
    })
}

function eliminarDirectorio(directory) {
    fs.readdir(directory, (err, files) => {
        if (err) throw err;
        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
            });
        }
        fs.rmdir(directory, function(err) {
            if (err) throw err
        })
    });
}

module.exports = petController;
