import axios from 'axios';
import API_URL from '../Config/Config';

const getContracts = async (config) => {
    try {
        const response = await axios.get(`${API_URL}/contracts`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching contracts:', error);
        throw error;
    }
};

const getUsers = async (config) => {
    try {
        const response = await axios.get(`${API_URL}/users`, config);
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

export { getContracts, getUsers };
