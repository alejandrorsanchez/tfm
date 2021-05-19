const express = require('express');
const router = express.Router();
const emailController = require('../controllers/email.controller');
const {ensureAuthenticated} = require("../middleware/authMiddelware");

router.post('/', ensureAuthenticated, emailController.send);

module.exports = router;
