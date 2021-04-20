const express = require('express');
const router = express.Router();
const petController = require('../controllers/pet.controller');
const {ensureAuthenticated} = require("../shared/authMiddelware");

router.get('/search/:userId', ensureAuthenticated, petController.findByUserId);

module.exports = router;
