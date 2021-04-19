const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const {ensureAuthenticated} = require("../shared/authMiddelware");

router.get('/', ensureAuthenticated, userController.getUsers);
router.get('/:id', ensureAuthenticated,  userController.findById);
router.get('/:username', userController.findByUsername);
router.post('/', userController.save);
router.post('/login', userController.getUser);

module.exports = router;
