const express = require('express');
const router = express.Router();
const multer  = require('multer');
const petController = require('../controllers/pet.controller');
const {ensureAuthenticated} = require("../middleware/authMiddelware");

storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './server/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const upload = multer({storage});

router.get('/search/:userId', ensureAuthenticated, petController.findByUserId);
router.post('/', ensureAuthenticated, petController.save);
router.post('/file', upload.single('image'), petController.uploadPhoto);
router.put('/:id', ensureAuthenticated,  petController.update);
router.delete('/:id', ensureAuthenticated, petController.delete);

module.exports = router;
