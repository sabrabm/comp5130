// server/routes/userDataRoutes.js
const express = require('express');
const { saveUserData, retrieveUserData, deleteUserData } = require('../controllers/userDataController');
const router = express.Router();

router.post('/saveData', saveUserData);
router.get('/retrieve/:shortUrl', retrieveUserData); 
router.delete('/delete/:shortUrl', deleteUserData);

module.exports = router;
