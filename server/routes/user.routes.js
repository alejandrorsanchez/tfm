const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const {ensureAuthenticated} = require("../shared/authMiddelware");

router.get('/', ensureAuthenticated, userController.getUsers);
router.get('/search/:username', userController.findByUsername);
router.get('/:id', ensureAuthenticated,  userController.findById);
router.post('/', userController.save);
router.post('/login', userController.getUser);
router.delete('/:id', ensureAuthenticated, userController.delete)

module.exports = router;
