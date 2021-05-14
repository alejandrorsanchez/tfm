const express = require('express');
const router = express.Router();
const comunicationController = require('../controllers/comunication.controller');
const {ensureAuthenticated} = require("../middleware/authMiddelware");

router.get('/', ensureAuthenticated, comunicationController.findByUserId1AndUserId2);
router.post('/', ensureAuthenticated, comunicationController.save);

module.exports = router;
