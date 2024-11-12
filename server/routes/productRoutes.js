// server/routes/productRoutes.js
const express = require('express');
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

// Get all products
router.get('/', getProducts);

// Add a new product
router.post('/add-product', authMiddleware, addProduct);

// Update a product
router.put('/:id', authMiddleware, updateProduct);

// Delete a product
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;
