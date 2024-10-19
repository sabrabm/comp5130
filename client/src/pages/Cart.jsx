import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { getCartItems, removeFromCart } from '../services/cartService'; // Assuming you have these services

const Cart = () => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [checkboxMarked, setcheckboxMarked] = useState(false);
  const [total, setTotal] = useState(0);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      if (!user || !user._id) return; // Wait until user is available
      try {
        // setLoading(true);
        const cartData = await getCartItems(user._id); // Fetch cart items for the logged-in user
        console.log("My Cart Data: ");
        console.log(cartData.products);
        setCartItems(cartData.products);
        setTotal(cartData.totalAmount)
        // setLoading(false);
      } catch (err) {
        setError('Failed to load cart data.');
        // setLoading(false);
      }
    };

    fetchCart();
  }, [user]); // Run effect when 'user' changes

  const handleCheckboxChange = (id, price, quantity, isChecked) => {
    let updatedItems = [...selectedItems];

    if (isChecked) {
      // Checkbox marked, add the item
      updatedItems.push({ id, price, quantity });
      setSubtotal(subtotal + price * quantity);
    } else {
      // Checkbox unmarked, remove the item
      updatedItems = updatedItems.filter((item) => item.id !== id);
      setSubtotal(subtotal - price * quantity);
    }

    setSelectedItems(updatedItems);
  };

  const handleRemove = async (itemId) => {
    try {
      await removeFromCart(user._id, itemId); // Remove item from cart
      setCartItems(cartItems.filter((item) => item._id !== itemId));
    } catch (err) {
      setError('Failed to remove item from cart.');
    }
  };
  

  // const handleCheckout = () => {
  //   navigate('/order', { state: { selectedItems, subtotal } }); // Redirect to Order page with selected items and subtotal
  // };

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>{error}</p>;
  // }

  return (
    <div className="container mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.productId}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        handleCheckboxChange(item._id, item.price, item.quantity, e.target.checked)
                      }
                    />
                  </td>
                  <td>{item.productId?.name ? item.productId.name : <span style={{ color: 'red' }}>Product removed</span>}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-6">
            <h3 className="text-lg font-bold">Subtotal: ${subtotal.toFixed(2)}</h3>
            <button
              // onClick={handleCheckout}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
