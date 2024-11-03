// models/Order.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true } // Unit price at the time of order
        }
    ],
    address: { type: String, required: true },
    contactNumber: { type: String, required: true },
    totalAmount: { type: Number, required: true }, // Total order amount
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
