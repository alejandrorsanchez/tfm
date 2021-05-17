const express = require('express');
const router = express.Router();
const comunicationController = require('../controllers/comunication.controller');
const {ensureAuthenticated} = require("../middleware/authMiddelware");

router.get('/', ensureAuthenticated, comunicationController.findByUserId1AndUserId2AndType);
router.get('/:userId', ensureAuthenticated, comunicationController.findByUserId);
router.post('/', ensureAuthenticated, comunicationController.save);
router.put('/:id', ensureAuthenticated,  comunicationController.update);

module.exports = router;
