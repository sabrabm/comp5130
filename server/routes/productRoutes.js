// server/routes/productRoutes.js
const express = require('express');
const { getProducts, addProduct } = require('../controllers/productController');
const router = express.Router();

// Get all products
router.get('/products', getProducts);

// Add a new product
router.post('/add-product', addProduct);

module.exports = router;
