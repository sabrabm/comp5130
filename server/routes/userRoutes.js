const express = require('express');
const { signup, login } = require('../controllers/userController');
const router = express.Router();

// User signup
router.post('/signup', signup);

// User login
router.post('/login', login);

module.exports = router;
