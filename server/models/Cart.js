const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [
        {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, default: 1 }
        }
    ],
    totalAmount: { type: Number, required: true },
}, { timestamps: true });

const  Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
