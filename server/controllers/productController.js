// server/controllers/productController.js
const Product = require('../models/Product');
const Cart = require('../models/Cart');

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

// Update an existing product
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, category, price, quantity, preference, description } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, category, price, quantity, preference, description },
            { new: true } // Returns the updated product
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product' });
    }
};

// Delete an existing product
// exports.deleteProduct = async (req, res) => {
//     const { id } = req.params;

//     try {
//         const deletedProduct = await Product.findByIdAndDelete(id);
//         if (!deletedProduct) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
//         res.status(200).json({ message: 'Product deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to delete product' });
//     }
// };

// Delete an existing product
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        // First, delete the product from the products collection
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Next, remove the deleted product from all users' carts
        await Cart.updateMany(
            { 'products.productId': id },
            { 
                $pull: { products: { productId: id } }, // Remove the product from the products array
                $inc: { totalAmount: -(deletedProduct.price * quantity) } // Adjust for quantity
            }
        );

        res.status(200).json({ message: 'Product and cart items deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete product' });
    }
};