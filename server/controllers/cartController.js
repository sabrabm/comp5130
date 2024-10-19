// controllers/cartController.js
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Get all items in the cart for a specific user
exports.getCartItems = async (req, res) => {
    const userId = req.params.userId;
    try {
        const cart = await Cart.findOne({ userId }).populate('products.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart is empty' });
        }
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch cart items', error });
    }
};

// Add a product to the user's cart
exports.addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        let cart = await Cart.findOne({ userId });
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const productPrice = product.price;

        if (!cart) {
            cart = new Cart({ userId, products: [], totalAmount: 0 });
        }

        const existingProductIndex = cart.products.findIndex((item) => item.productId.toString() === productId);

        if (existingProductIndex > -1) {
            cart.products[existingProductIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity, price: productPrice });
        }

        cart.totalAmount = cart.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add to cart', error });
    }
};

// Remove a product from the cart
exports.removeFromCart = async (req, res) => {
    const { userId, itemId } = req.params;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove the product by matching productId as a string
        cart.products = cart.products.filter((item) => item._id.toString() !== itemId);
        cart.totalAmount = cart.products.reduce((sum, item) => sum + item.price * item.quantity, 0);

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove item from cart', error });
    }
};
