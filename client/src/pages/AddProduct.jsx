import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct } from '../services/productService';
import { useUser } from '../contexts/UserContext';

const AddProduct = () => {
    const { user } = useUser();
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
            await addProduct(productData);
            setSuccess('Product added successfully');
            setError('');
            navigate('/shop');
        } catch (error) {
            setError('Failed to add product. Please try again.');
            setSuccess('');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-200 to-gray-300">
            <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Add New Product</h2>

                {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                {success && <p className="text-green-600 text-sm text-center">{success}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={productData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-150 ease-in-out"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Category</label>
                        <input
                            type="text"
                            name="category"
                            value={productData.category}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-150 ease-in-out"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            value={productData.price}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-150 ease-in-out"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={productData.quantity}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-150 ease-in-out"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Preference</label>
                        <input
                            type="text"
                            name="preference"
                            value={productData.preference}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-150 ease-in-out"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-semibold text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={productData.description}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 transition duration-150 ease-in-out"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-500 transition duration-200 ease-in-out shadow-lg transform hover:scale-105"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
