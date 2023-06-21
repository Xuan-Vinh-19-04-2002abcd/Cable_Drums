import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../Config/Config';
import LogoutButton from '../components/Button/Signup';

const Contractor = () => {
    const [requests, setRequests] = useState([]);
    const [showModel, setShowModel] = useState(false);
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    useEffect(() => {
        const getAllRequests = async () => {
            try {
                const response = await axios.post(
                    `${API_URL}/requests/contractorRequest`,
                    {
                        projectContractorUserId: loggedInUser._id,
                    },
                    config
                );
                setRequests(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getAllRequests();
    }, [loggedInUser._id]);

    const handleStatusChange = async (event, requestId) => {
        const newStatus = event.target.value;

        try {
            const response = await axios.post(
                `${API_URL}/requests/status`,
                { requestId: requestId, status: newStatus },
                config
            );
            const updatedRequest = response.data;

            setRequests((prevRequests) => {
                const updatedRequests = prevRequests.map((request) => {
                    if (request._id === updatedRequest._id) {
                        return updatedRequest;
                    }
                    return request;
                });
                return updatedRequests;
            });

            setShowModel(true);

            setTimeout(() => {
                setShowModel(false);
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    };

    const getRequestStatus = (status, requestId) => {
        const statusOptions = ['Collected', 'Ready to Collect'];

        if (status === 'New') {
            return (
                <div className="flex justify-center">
                    <button className="border border-stone-500 py-1 px-12 bg-slate-400 cursor-default rounded-md">
                        {status}
                    </button>
                </div>
            );
        }

        return (
            <div className="flex justify-center">
                <select
                    value={status}
                    className="appearance-none border-gray-50 text-black py-2 px-3 pr-2 rounded leading-tight cursor-pointer text-center"
                    onChange={(event) => handleStatusChange(event, requestId)}
                >
                    {statusOptions.map((option) => (
                        <option
                            className="text-black"
                            key={option}
                            value={option}
                            disabled={option === 'New'}
                        >
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        );
    };

    return (
        <div className="container mx-auto p-4 bg-black h-screen">
            <div className="flex justify-between">
                <div>
                    <div className="w-24 h-24  rounded-full bg-cyan-800 mb-2 ml-5   "></div>
                    <p className='px-2 py-2 rounded-2xl font-bold text-white '>{loggedInUser.username}</p>
                </div>
                <div> <LogoutButton/></div>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-center">Contractor Requests</h1>
            <div className="overflow-x-auto">
                <table className="w-[85%] border border-gray-300 mx-auto">
                    <thead>
                    <tr className="">
                        <th className="border border-gray-300 px-4 py-2 text-white">Request ID</th>
                        <th className="border border-gray-300 px-4 py-2 text-white">Planner</th>
                        <th className="border border-gray-300 px-4 py-2 text-white">Quantity</th>
                        <th className="border border-gray-300 px-4 py-2 text-white">Super Vendor</th>
                        <th className="border border-gray-300 px-4 py-2 text-white">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {requests.map((request, index) => (
                        <tr key={request._id} className={(index % 2 === 0) ? "" : ""}>
                            <td className="border border-gray-300 px-4 py-2 text-white">{index + 1}</td>
                            <td className="border border-gray-300 px-4 py-2 text-white">{request.plannerUsername}</td>
                            <td className="border border-gray-300 px-4 py-2 text-white">{request.quantity}</td>
                            <td className="border border-gray-300 px-4 py-2 text-white">{request.vendorUsername}</td>
                            <td className="border border-gray-300 px-4 py-2 text-white">
                                {getRequestStatus(request.status, request._id)}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {showModel && (
                <div className="fixed bottom-4 right-4 bg-white rounded-md shadow-md p-4">
                    <p className="text-green-500">Status updated successfully!</p>
                </div>
            )}
        </div>
    );
};

export default Contractor;
