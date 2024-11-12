// services/userDataServices.js
import axios from 'axios';

export const saveUserData = async (userData) => {
    try {
        const response = await axios.post('http://localhost:3005/api/userData/saveData', { userInput: userData });
        return response.data;
    } catch (error) {
        throw new Error('Error saving data');
    }
};
