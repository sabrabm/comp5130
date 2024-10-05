// server/routes/productRoutes.js
const express = require('express');
const { getProducts, addProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

// Get all products
router.get('/', getProducts);

// Add a new product
router.post('/add-product', addProduct);

// Update a product
router.put('/:id', updateProduct);

// Delete a product
router.delete('/:id', deleteProduct);

module.exports = router;
