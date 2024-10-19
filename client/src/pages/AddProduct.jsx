import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../services/productService'; // Import your addProduct service
import { useUser } from '../contexts/UserContext';

const AddProduct = () => {
    const { user } = useUser(); // Get the current user from the UserContext
    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        name: '',
        category: '',
        price: '',
        quantity: '',
        preference: '',
        description: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        setProductData({ ...productData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user || (user.role !== 'admin' && user.role !== 'superuser')) {
            setError('You do not have permission to add products.');
            return;
        }

        try {
            await addProduct(productData); // Call addProduct service to create a new product
            setSuccess('Product added successfully');
            setError(''); // Clear any errors
            navigate('/shop'); // Redirect to the Shop page after successful submission
        } catch (error) {
            setError('Failed to add product. Please try again.');
            setSuccess(''); // Clear success message if error occurs
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6 mt-6">
            <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

            {error && <p className="text-red-600">{error}</p>}
            {success && <p className="text-green-600">{success}</p>}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Product Name</label>
                    <input
                        type="text"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={productData.category}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Quantity</label>
                    <input
                        type="number"
                        name="quantity"
                        value={productData.quantity}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Preference</label>
                    <input
                        type="text"
                        name="preference"
                        value={productData.preference}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Description</label>
                    <textarea
                        name="description"
                        value={productData.description}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProduct;
