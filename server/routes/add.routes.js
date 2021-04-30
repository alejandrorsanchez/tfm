const express = require('express');
const router = express.Router();
const addController = require('../controllers/add.controller');
const {ensureAuthenticated} = require("../middleware/authMiddelware");

router.post('/adoption', ensureAuthenticated, addController.saveAdoption);
router.post('/volunteer', ensureAuthenticated, addController.saveVolunteer);
router.get('/', ensureAuthenticated, addController.findByType);

module.exports = router;
