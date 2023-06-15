import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URL from '../../Config/Config';
import LogoutButton from '../Button/Signup';

const Vendor = () => {
    const [contracts, setContracts] = useState([]);
    const [showContracts, setShowContracts] = useState(true);
    const [showRequests, setShowRequests] = useState(false);
    const [showModel, setShowModel] = useState(false);
    const [requests, setRequests] = useState([]);
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    useEffect(() => {
        const getContracts = async () => {
            try {
                const response = await axios.post(`${API_URL}/contracts/vendor`,{suppervendorId:loggedInUser._id}, config);
                console.log(response.data)
                setContracts(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const getRequests = async () => {
            try {
                const response = await axios.post(
                    `${API_URL}/requests/vendorRequest`,
                    {
                        supperVendorId: loggedInUser._id,
                    },
                    config
                );
                console.log(response.data)
                setRequests(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getContracts();
        getRequests();
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
        const statusOptions = ['New', 'Ready to Collect'];

        if (status === 'Collected') {
            return (
                <div className="flex justify-center">
                    <button className="border border-stone-500 py-1 px-9 bg-red-600 cursor-default rounded-md">
                        {status}
                    </button>
                </div>
            );
        }

        return (
            <div className="flex justify-center">
                <select
                    value={status}
                    className="appearance-none bg-black text-white py-2 px-3 pr-2 rounded leading-tight cursor-pointer text-center"
                    onChange={(event) => handleStatusChange(event, requestId)}
                >
                    {statusOptions.map((option) => (
                        <option
                            className="text-white"
                            key={option}
                            value={option}
                        >
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        );
    };
    return (
        <div className="w-screen h-screen box-border ">
            <div className="w-screen h-screen flex flex-row justify-around">

                <div className="w-1/6 bg-amber-900 h-screen ">
                    <div className="flex flex-col items-center mt-2">
                        <div className="w-24 h-24  rounded-full bg-cyan-800 mb-2"></div>
                        <p className="text-white text-2xl font-mono">{loggedInUser.username}</p>
                    </div>

                   <div className="flex flex-col justify-center items-center h-screen">
                       <button
                           onClick={() => { setShowRequests(false); setShowContracts(true) }}
                           className="block py-2 px-8  bg-emerald-700 shadow-md hover:bg-emerald-800 mb-4 text-white rounded-2xl"
                       >
                           Contract
                       </button>
                       <button
                           onClick={() => { setShowRequests(true); setShowContracts(false) }}
                           className="block py-2 px-8  bg-black shadow-md hover:bg-gray-900 mb-4 text-white rounded-2xl"
                       >
                           Request
                       </button>
                   </div>
                </div>
                {showContracts && (
                        <div className="w-5/6 h-screen ">
                            <div className='flex justify-between mb-4 mt-2'>
                                <p></p>
                                <LogoutButton/>
                            </div>
                            <h1 className="text-2xl font-bold mb-4 text-center">Your Contracts</h1>
                            <div className="overflow-x-auto w-1/2 mx-auto flex">
                                <table className="w-full border-collapse">
                                    <thead>
                                    <tr className="bg-slate-400">
                                        <th className="border border-gray-300 px-4 py-2">STT</th>
                                        <th className="border border-gray-300 px-4 py-2">Start Date</th>
                                        <th className="border border-gray-300 px-4 py-2">End Date</th>
                                        <th className="border border-gray-300 px-4 py-2">Name Vendor</th>

                                    </tr>
                                    </thead>
                                    <tbody>
                                    {contracts.map((contract,index) => (
                                        <tr key={contract._id}>
                                            <td className="border border-gray-300 px-4 py-2">{index+1}</td>
                                            <td className="border border-gray-300 px-4 py-2">{contract.startDate}</td>
                                            <td className="border border-gray-300 px-4 py-2">{contract.endDate}</td>
                                            <td className="border border-gray-300 px-4 py-2">{contract.username}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                {showRequests && (
                    <div className="w-5/6 h-screen ">
                        <div className='flex justify-between mb-4 mt-2 mr-2'>
                           <p></p>
                            <LogoutButton/>
                        </div>
                        <h1 className="text-2xl font-bold mb-4 text-center">All Your Requests</h1>
                        <div className="overflow-x-auto">
                            <table className="border-collapse w-[85%] mx-auto">
                                <thead>
                                <tr className='bg-slate-400'>
                                    <th className="border border-gray-300 px-4 py-2">Request ID</th>
                                    <th className="border border-gray-300 px-4 py-2">Planner</th>
                                    <th className="border border-gray-300 px-4 py-2">Quantity</th>
                                    <th className="border border-gray-300 px-4 py-2">Project Contractor</th>
                                    <th className="border border-gray-300 px-4 py-2">Status</th>

                                </tr>
                                </thead>
                                <tbody>
                                {requests.map((request,index)=> (
                                    <tr key={request._id}>
                                        <td className="border border-gray-300 px-4 py-2">{index+1}</td>
                                        <td className="border border-gray-300 px-4 py-2">{request.plannerUsername}</td>
                                        <td className="border border-gray-300 px-4 py-2">{request.quantity}</td>
                                        <td className="border border-gray-300 px-4 py-2">{request.contractorUsername}</td>
                                        <td className= "border border-gray-300 px-4 py-2">
                                            {getRequestStatus(request.status, request._id)}
                                        </td>

                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}


            </div>

            {showModel && (
                <div className="fixed bottom-4 right-4 bg-white rounded-md shadow-md p-4">
                    <p className="text-green-500">Status updated successfully!</p>
                </div>
            )}
        </div>
    );
};

export default Vendor;
