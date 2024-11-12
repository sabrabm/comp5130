// cartService.js
import axios from 'axios';

export const getCartItems = async (userId) => {
  const token = localStorage.getItem('token'); // Get the stored token
  const response = await axios.get(`http://localhost:3005/api/cart/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}` // Include token in request headers
    }
  });
  return response.data;
};

export const removeFromCart = async (userId, itemId) => {
  try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      const response = await axios.delete(`http://localhost:3005/api/cart/${userId}/remove/${itemId}`, {
          headers: {
              Authorization: `Bearer ${token}` // Attach token in the Authorization header
          }
      });
      return response.data;
  } catch (error) {
      throw new Error('Failed to delete cart item');
  }
};