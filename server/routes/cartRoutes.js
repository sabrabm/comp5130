// routes/cartRoutes.js
const express = require('express');
const { getCartItems, addToCart, removeFromCart } = require('../controllers/cartController');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');

// Get cart items for the user
router.get('/:userId', getCartItems);

// Add product to cart
router.post('/add', addToCart);

// Remove product from cart
router.delete('/:userId/remove/:itemId', authMiddleware, removeFromCart);

module.exports = router;
