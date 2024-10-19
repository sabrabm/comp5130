// Order.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { placeOrder } from '../services/orderService'; // Assuming this service exists

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedItems, subtotal } = location.state; // Get items and subtotal from Cart page
  const [formData, setFormData] = useState({
    address: '',
    contactNumber: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    const orderData = {
      address: formData.address,
      contactNumber: formData.contactNumber,
      items: selectedItems,
      totalAmount: subtotal
    };
    await placeOrder(orderData); // Place the order via backend
    alert('Order placed successfully!');
    navigate('/'); // Redirect to homepage or any other page
  };

  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Place Order</h2>
      <div className="space-y-4">
        <div>
          <label className="block font-bold mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your address"
            required
          />
        </div>
        <div>
          <label className="block font-bold mb-2">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter your contact number"
            required
          />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-bold">Order Summary</h3>
        <ul className="mt-4">
          {selectedItems.map((item) => (
            <li key={item.productId} className="mb-2">
              {item.quantity} x {item.product.name} @ ${item.price}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <h4 className="text-lg font-bold">Total: ${subtotal.toFixed(2)}</h4>
        </div>
        <button
          onClick={handlePlaceOrder}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Order;
