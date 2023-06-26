import axios from 'axios';
import API_URL from '../Config/Config';

export const getUsers = async (searchText) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.post(
            `${API_URL}/users/search`,
            { text: searchText },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error('An error occurred while fetching users:', error);
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        const token = localStorage.getItem('token');

        await axios.post(
            `${API_URL}/users`,
            { userId: userId },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
    } catch (error) {
        console.error('An error occurred while deleting user:', error);
        throw error;
    }
};
