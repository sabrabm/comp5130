import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext'; // Import the user context

const Login = () => {
    const { setUser } = useUser(); // Access the context to set the user
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3005/api/users/login', formData); // Fix the endpoint
            localStorage.setItem('token', response.data.token); // Save the token

            // Set the user data in context
            setUser(response.data.user); // Set the user data from response

            setError(null);
            navigate('/'); // Redirect to homepage after login
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-200 to-gray-300">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg transform hover:shadow-xl transition-shadow duration-500">
                <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                    Login to Your Account
                </h1>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full p-4 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                        />
                    </div>
                    <div className="relative">
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="w-full p-4 border border-gray-300 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-600 text-white font-semibold py-3 rounded-lg hover:bg-gray-500 transition duration-200 transform hover:scale-105"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-600">Don't have an account? <span className="text-blue-500 cursor-pointer">Sign up</span></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
