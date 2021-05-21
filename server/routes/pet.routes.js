const express = require('express');
const router = express.Router();
const multer  = require('multer');
const petController = require('../controllers/pet.controller');
const {ensureAuthenticated} = require("../middleware/authMiddelware");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({
    storage,
    limits: {
        fileSize: 8000000
    }
});

router.get('/:id', ensureAuthenticated, petController.findById);
router.get('/search/:userId', ensureAuthenticated, petController.findByUserId);
router.post('/', ensureAuthenticated, petController.save);
router.post('/file', upload.single('image'), petController.uploadPhoto);
router.put('/:id', ensureAuthenticated,  petController.update);
router.delete('/:id', ensureAuthenticated, petController.delete);

module.exports = router;
