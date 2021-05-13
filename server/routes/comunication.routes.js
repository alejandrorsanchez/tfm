const express = require('express');
const router = express.Router();
const comunicationController = require('../controllers/comunication.controller');
const {ensureAuthenticated} = require("../middleware/authMiddelware");

router.get('/', ensureAuthenticated, comunicationController.findByBothUserId);

module.exports = router;
