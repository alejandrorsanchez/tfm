const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const {ensureAuthenticated} = require("../middleware/authMiddelware");

router.get('/search/:username', userController.findByUsername);
router.get('/:id', ensureAuthenticated, userController.findById);
router.post('/', userController.save);
router.post('/login', userController.getUser);
router.put('/:id', ensureAuthenticated, userController.update);
router.delete('/:id', ensureAuthenticated, userController.delete);

module.exports = router;
