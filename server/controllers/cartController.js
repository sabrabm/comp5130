const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [], totalAmount: 0 });
    }

    const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Failed to add to cart' });
  }
};

// removeFromCart
exports.removeFromCart = async(req, res) => {
    const {id} = req.params;
    try {
        const deletedCartItem = await Cart.findByIdAndUpdate(id);
        if(!deletedCartItem) {
            return res.status(404).json({ message: 'Cart Item not found!' })
        }
        res.status(200).json({ message: 'Cart Item deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove cart item' })
    }
}

//getCart items
exports.getCart = async(req, res) => {
    try {
        const allCartItems = await Cart.find();
        res.json(allCartItems);
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}