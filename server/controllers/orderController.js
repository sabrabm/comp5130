// controllers/orderController.js
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// Place an order and clear the selected items from the cart
exports.placeOrder = async (req, res) => {
    const { userId, items, address, contactNumber, totalAmount } = req.body;

    try {
        // Create a new order
        const newOrder = new Order({
            userId,
            products: items,
            address,
            contactNumber,
            totalAmount
        });
        await newOrder.save();

        // Remove the selected items from the cart
        const cart = await Cart.findOne({ userId });
        if (cart) {
            cart.products = cart.products.filter(
                (cartItem) => !items.some((item) => item.productId.toString() === cartItem.productId.toString())
            );
            cart.totalAmount = cart.products.reduce((sum, item) => sum + item.price * item.quantity, 0);
            await cart.save();
        }

        res.status(200).json({ message: 'Order placed successfully', order: newOrder });
    } catch (error) {
        res.status(500).json({ message: 'Failed to place order', error });
    }
};
