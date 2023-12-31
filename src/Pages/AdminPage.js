import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../Utils/AdminService';
import LogoutButton from '../components/Button/Signup';
import CreateRoleForm from '../components/Admin/FormRole';
import UserTable from "../components/Admin/Table/UserTable";
import Dashboard from "../components/Admin/CountUser/Dashboard";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModel, setShowModel] = useState(false);
  const [showRoleForm, setShowRoleForm] = useState(false);

  const handleCreateUserSuccess = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleSearch = (event) => {
    const searchText = event.target.value;
    setSearchTerm(searchText);
  };

  const handleDelete = async (userId) => {
    try {
      await deleteUser(userId);
      const updatedUsers = await getUsers('');
      setUsers(updatedUsers);
      setShowModel(true);
      setTimeout(() => {
        setShowModel(false);
      }, 3000);
    } catch (error) {
      console.error('An error occurred while deleting user:', error);
    }
  };

  useEffect(() => {
    const fetchUsers = async (searchText) => {
      try {
        const data = await getUsers(searchText);
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers("");
  }, []);

  const filteredUsers = users.filter(
      (user) =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateRequest = () => {
    setShowRoleForm(true);
  };

  const handleCloseModal = () => {
    setShowRoleForm(false);
  };

  return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-amber-900">
        <div className="bg-gray-800 w-full lg:w-1/6 lg:min-h-screen">
          <div className="flex flex-col items-center justify-center h-screen">
            <p className="text-white text-3xl font-semibold font-mono">Admin</p>
          </div>
        </div>
        <div className="w-full lg:w-5/6">
          <div className="mt-10 flex justify-end mr-2">
            <LogoutButton />
          </div>
          <div className="md:mt-8 mt-4">
            <div className="mb-4 flex justify-between">
              {!showRoleForm && (
                  <button
                      className="flex-start px-4 py-2 rounded-md text-white bg-black mx-3 font-mono"
                      onClick={handleCreateRequest}
                  >
                    Create User
                  </button>
              )}

              <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="border border-gray-300 rounded-md py-2 px-4 w-full lg:w-3/12 font-mono mr-2"
              />
            </div>
            <div className="w-full border-t-2 border-gray-500"></div>
          </div>
          <div className="bg-blue-300 h-screen">
            <div className="overflow-x-auto flex flex-col">
              <UserTable filteredUsers={filteredUsers} handleDelete={handleDelete} />
              <div>
                <div className='flex justify-around mt-8'>
                  <Dashboard
                      plannerCount={users.filter(user => user.role === 'Planner').length}
                      vendorCount={users.filter(user => user.role === 'Vendor').length}
                      contractorCount={users.filter(user => user.role === 'Contractor').length}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {showRoleForm && (
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

                <CreateRoleForm handleCreateClose={handleCloseModal} handleCreateSuccess={handleCreateUserSuccess} />
              </div>
            </div>
        )}
        {showModel && (
            <div className="fixed bottom-4 right-4 bg-white rounded-md shadow-md p-4">
              <p className="text-red-600 font-bold">Delete successfully!</p>
            </div>
        )}
      </div>
  );
};

export default AdminPage;
