const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getUsers);
router.get('/:username', userController.getUser);
router.post('/', userController.postUser);

module.exports = router;
