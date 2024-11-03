// server/routes/userDataRoutes.js
const express = require('express');
const { saveUserData } = require('../controllers/userDataController');
const router = express.Router();

router.post('/saveData', saveUserData);

module.exports = router;
