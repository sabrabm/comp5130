import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { getCartItems, removeFromCart } from '../services/cartService';

const Cart = () => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user || !user._id) return;
      try {
        const cartData = await getCartItems(user._id);
        setCartItems(cartData.products);
      } catch (err) {
        setError('Failed to load cart data.');
      }
    };

    fetchCart();
  }, [user]);

  const handleCheckboxChange = (id, price, quantity, isChecked) => {
    let updatedItems = [...selectedItems];

    if (isChecked) {
      updatedItems.push({ id, price, quantity });
    } else {
      updatedItems = updatedItems.filter((item) => item.id !== id);
    }

    setSelectedItems(updatedItems);

    const newSubtotal = updatedItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(newSubtotal);
  };

  const handleRemove = async (itemId) => {
    try {
      await removeFromCart(user._id, itemId);
      const updatedCartItems = cartItems.filter((item) => item._id !== itemId);
      setCartItems(updatedCartItems);

      // Check if the removed item was selected
      const removedItem = selectedItems.find(item => item.id === itemId);
      if (removedItem) {
        // Update selectedItems to remove the deleted item
        const updatedSelectedItems = selectedItems.filter((item) => item.id !== itemId);
        setSelectedItems(updatedSelectedItems);

        // Recalculate subtotal based on remaining selected items
        const newSubtotal = updatedSelectedItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        );
        setSubtotal(newSubtotal);
      }
    } catch (err) {
      setError('Failed to remove item from cart.');
    }
  };

  return (
    <div className="container mx-auto mt-6 min-h-screen bg-gradient-to-r from-gray-200 to-gray-300 p-8">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Your Cart
        </h2>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-center"></th>
                  <th className="py-3 px-6">Product</th>
                  <th className="py-3 px-6">Quantity</th>
                  <th className="py-3 px-6">Price</th>
                  <th className="py-3 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {cartItems.map((item) => (
                  <tr key={item.productId} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-center">
                      <input
                        type="checkbox"
                        className="transform scale-125"
                        onChange={(e) =>
                          handleCheckboxChange(item._id, item.price, item.quantity, e.target.checked)
                        }
                      />
                    </td>
                    <td className="py-3 px-6">
                      {item.productId?.name ? (
                        <span className="font-medium">{item.productId.name}</span>
                      ) : (
                        <span className="text-red-500">Product removed</span>
                      )}
                    </td>
                    <td className="py-3 px-6">{item.quantity}</td>
                    <td className="py-3 px-6">${item.price.toFixed(2)}</td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="text-red-500 hover:text-red-700 transition duration-200 ease-in-out"
                      >
                        <FontAwesomeIcon icon={faTrash} className="text-xl" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-8 flex justify-between items-center">
              <h3 className="text-2xl font-semibold text-gray-700">
                Subtotal: <span className="text-gray-800">${subtotal.toFixed(2)}</span>
              </h3>
              <button
                className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 transform hover:scale-105 transition-transform duration-300"
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
