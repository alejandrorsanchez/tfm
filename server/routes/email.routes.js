const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email.controller');

router.post('/', emailController.send);
router.get('/verification', emailController.verify);

module.exports = router;
