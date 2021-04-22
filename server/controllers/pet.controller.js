const petController = {};
const db = require('../database');

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
        res.json({ message: 'Mascota creada correctamente!' });
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
    })
}

petController.uploadPhoto = (req, res) => {
    res.json({ message: 'Imagen guardada' });
}

module.exports = petController;
