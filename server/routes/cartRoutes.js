const express = require('express');
const { addToCart, removeFromCart, getCart } = require('../controllers/cartController');
const router = express.Router();

// Add product to cart
router.post('/add', addToCart);

// Remove product from cart
router.delete('/remove/:id', removeFromCart);

// Get user cart
router.get('/:userId', getCart);

module.exports = router;
