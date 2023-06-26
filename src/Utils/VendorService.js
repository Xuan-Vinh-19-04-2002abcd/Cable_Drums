import axios from 'axios';
import API_URL from '../Config/Config';

const getContracts = async (loggedInUserId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.post(
            `${API_URL}/contracts/vendor`,
            { suppervendorId: loggedInUserId },
            config
        );
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const getRequests = async (loggedInUserId, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    try {
        const response = await axios.post(
            `${API_URL}/requests/vendorRequest`,
            {
                supperVendorId: loggedInUserId,
            },
            config
        );
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
};

const updateRequestStatus = async (requestId, newStatus, config) => {
    try {
        const response = await axios.post(
            `${API_URL}/requests/status`,
            { requestId: requestId, status: newStatus },
            config
        );
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export { getContracts, getRequests, updateRequestStatus };
