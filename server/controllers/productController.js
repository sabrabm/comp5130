// server/controllers/productController.js
const Product = require('../models/Product');

// Fetch all products
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Add a new product
exports.addProduct = async (req, res) => {
    const { name, category, price, quantity, preference, description } = req.body;
    try {
        const newProduct = new Product({
        name,
        category,
        price,
        quantity,
        preference,
        description,
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add product' });
    }
};
