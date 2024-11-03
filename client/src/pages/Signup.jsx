import React, { useState } from 'react';
import { signup } from '../services/userService';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(formData);
            setMessage('User registered successfully');
            setError(''); // Clear the error
        } catch (error) {
            setError(error.message || 'Failed to register user'); // Use dynamic error
            setMessage('');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-200 to-gray-300">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg transform hover:shadow-xl transition-shadow duration-500">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">
                    Create Your Account
                </h2>
                {message && <p className="text-green-500 text-center mb-4">{message}</p>}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <label htmlFor="name" className="block text-lg font-medium mb-2 text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="email" className="block text-lg font-medium mb-2 text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block text-lg font-medium mb-2 text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-600 text-white font-semibold py-3 rounded-lg hover:bg-gray-500 transition duration-200 transform hover:scale-105"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
