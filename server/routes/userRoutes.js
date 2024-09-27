// server/routes/userRoutes.js
const express = require('express');
const { signup } = require('../controllers/userController');
const router = express.Router();

// User signup
router.post('/signup', signup);

module.exports = router;
