// server/controllers/userController.js
const User = require('../models/User');

// User signup
exports.signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = new User({
        name,
        email,
        password,
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Failed to register user' });
    }
};
