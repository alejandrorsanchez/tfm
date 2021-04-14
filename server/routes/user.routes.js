const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getUsers);
router.get('/:username', userController.findByUsername);
router.post('/', userController.save);
router.post('/login', userController.getUser);

module.exports = router;
