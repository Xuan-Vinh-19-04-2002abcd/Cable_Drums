import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CableDrumRequest from '../components/Planer/FormRequest';
import API_URL from '../Config/Config';
import LogoutButton from '../components/Button/Signup';
import ContractTable from "../components/Planer/PlannerTable";
import UserAvatar from "../components/Button/Avatar";

const Planner = () => {
  const [contracts, setContracts] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [projectContractors, setProjectContractors] = useState([]);
  const [showModel, setShowModel] = useState(false);
  const [showCableDrumRequest, setShowCableDrumRequest] = useState(false);
  const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  useEffect(() => {
    const fetchContracts = async () => {
      try {

        const response = await axios.get(`${API_URL}/contracts`,config);
        console.log(response.data);
        setContracts(response.data);
      } catch (error) {
        console.error('Error fetching contracts:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${API_URL}/users`,config);
        console.log(response.data);
        const filteredVendors = response.data.filter((user) => user.role === 'Vendor');
        setVendors(filteredVendors);
        const filteredProjectContractors = response.data.filter((user) => user.role === 'Contractor');
        setProjectContractors(filteredProjectContractors);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchContracts();
    fetchUsers();

  }, []);

  useEffect(() => {
    const updatedContracts = contracts.map((contract) => {
      const vendor = vendors.find((vendor) => vendor.id === contract.supplyVendorId);
      return {
        ...contract,
        vendor: vendor ? vendor.username : null,
      };
    });
    setContracts(updatedContracts);
  }, [vendors]);

  const handleCreateRequest = () => {
    setShowCableDrumRequest(true);
  };

  const handleCloseModal = () => {
    setShowCableDrumRequest(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-black opacity-90">
      <div className='flex justify-between mb-4'>
          <UserAvatar username={loggedInUser.username}></UserAvatar>
       <div> <LogoutButton/></div>
      </div>
      <div className="w-full mb-8">
        <h2 className="text-2xl font-bold mb-4 text-center">All Your Contracts</h2>
        <div className="overflow-x-auto">
          <ContractTable contracts={contracts}></ContractTable>
        </div>
      </div>

      {showCableDrumRequest && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-4 rounded shadow">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={handleCloseModal}
            >
              <span className="sr-only">Close</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 4.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          
            <CableDrumRequest vendors={vendors} projectContractors={projectContractors} handleCreateClose={handleCloseModal} setShowModel={setShowModel}/>
          </div>
        </div>
      )}

      {!showCableDrumRequest && (
          <button className="bg-blue-900 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 ml-36 border border-dashed border-blue-500 transition-colors duration-300 hover:border-blue-700" onClick={handleCreateRequest}>
            Create Request +
          </button>

      )}
      {showModel && (
          <div className="fixed bottom-4 right-4 bg-white rounded-md shadow-md p-4">
            <p className="text-green-500">Request created successfully!</p>
          </div>
      )}
    </div>
  );
};

export default Planner;
