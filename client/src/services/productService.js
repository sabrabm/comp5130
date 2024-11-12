import axios from 'axios';

// Fetch all products
export const fetchProducts = async () => {
    try {
        const response = await axios.get(`http://localhost:3005/api/products`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch products');
    }
};

// Add a new product
export const addProduct = async (productData) => {
    try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await axios.post('http://localhost:3005/api/products/add-product', productData, {
            headers: {
                Authorization: `Bearer ${token}` // Attach token in the Authorization header
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to add product');
    }
};

// Update a product
export const updateProduct = async (id, updatedProductData) => {
    try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await axios.put(`http://localhost:3005/api/products/${id}`, updatedProductData, {
            headers: {
                Authorization: `Bearer ${token}` // Attach token in the Authorization header
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to update product');
    }
};

// Delete a product
export const deleteProduct = async (id) => {
    try {
        const token = localStorage.getItem('token'); // Get token from localStorage
        const response = await axios.delete(`http://localhost:3005/api/products/${id}`, {
            headers: {
                Authorization: `Bearer ${token}` // Attach token in the Authorization header
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete product');
    }
};

// Add to Cart function
export const addToCart = async ({ userId, productId, quantity }) => {
    // console.log(quantity);
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:3005/api/cart/add', {
            userId,
            productId,
            quantity
        });
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
};