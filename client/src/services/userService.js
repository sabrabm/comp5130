import axios from 'axios';

// User signup
export const signup = async (userData) => {
    try {
        const response = await axios.post('http://localhost:3005/api/users/signup', userData); // Fix the endpoint
        return response.data;
    } catch (error) {
        throw new Error('Failed to register user');
    }
};
