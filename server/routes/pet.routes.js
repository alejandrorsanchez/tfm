const express = require('express');
const router = express.Router();
const multer  = require('multer');
const petController = require('../controllers/pet.controller');
const {ensureAuthenticated} = require("../shared/authMiddelware");

storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({storage});

router.get('/search/:userId', ensureAuthenticated, petController.findByUserId);
router.post('/file', upload.single('image'), petController.uploadPhoto);
router.delete('/:id', ensureAuthenticated, petController.delete);

module.exports = router;
