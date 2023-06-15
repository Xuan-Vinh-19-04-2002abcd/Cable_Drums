import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../../Config/Config';
import LogoutButton from '../Button/Signup';
import CreateRoleForm from './FormRole';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiOutlineUser,GrUserAdmin} from 'react-icons/ai';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showRoleForm, setShowRoleForm] = useState(false);
  const [plannerCount, setPlannerCount] = useState(0);
  const [vendorCount, setVendorCount] = useState(0);
  const [contractorCount, setContractorCount] = useState(0);

  const getUsers = async (searchText) => {
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

  useEffect(() => {
    getUsers("")
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => {
          console.error(error);
        });
  }, []);

  const handleCreateUserSuccess = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
  };

  const handleSearch = (event) => {
    const searchText = event.target.value;
    setSearchTerm(searchText);

    getUsers(searchText)
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => {
          console.error(error);
        });
  };
  useEffect(() => {
    const countRoles = () => {
      const plannerCount = users.filter((user) => user.role === 'Planner').length;
      const vendorCount = users.filter((user) => user.role === 'Vendor').length;
      const contractorCount = users.filter((user) => user.role === 'Contractor').length;

      setPlannerCount(plannerCount);
      setVendorCount(vendorCount);
      setContractorCount(contractorCount);
    };

    countRoles();
  }, [users]);

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
  const handleDelete = (id) => {
    // Xử lý logic xóa dữ liệu với ID cung cấp
  };

  return (
      <div className="flex flex-col lg:flex-row min-h-screen bg-amber-900">
        <div className="bg-gray-800 w-full lg:w-1/6 lg:min-h-screen">
          <div className="flex flex-col items-center justify-center h-screen">

            <p className="text-white text-3xl font-semibold font-mono">Admin</p>
          </div>
        </div>
        <div className="w-full lg:w-5/6 ">
          <div className="mt-10 flex justify-end mr-2">
            <LogoutButton />
          </div>
          <div className="md:mt-8 mt-4">
            <div className="mb-4 flex justify-between ">
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
            <div className="overflow-x-auto flex flex-col ">
              <table className="w-[50%] bg-white shadow-md rounded my-4 mx-auto">
                <thead className="bg-gray-200 text-gray-700">
                <tr>
                  <th className="py-2 px-4">STT</th>
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Role</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
                </thead>
                <tbody className="text-gray-600">
                {filteredUsers.map((user, index) => (
                    <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                      <td className="text-center font-mono py-1">{index + 1}</td>
                      <td className="text-center font-mono">{user.username}</td>
                      <td className="text-center font-mono">{user.role}</td>
                      <td className="text-center font-bold">
                        <button onClick={() => handleDelete(user._id)}>
                          <AiOutlineDelete/>
                        </button>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
              <div>
                <div className='flex justify-around mt-8'>
                  <div className="bg-green-800 p-4 rounded-lg shadow-lg w-1/5">
                    <div className="flex items-center">
                      <AiOutlineUser className="text-4xl mr-2 text-white" />
                      <div>
                        <h3 className="text-xl font-serif text-white ">Planner</h3>
                        <p className="text-2xl font-serif text-white">{plannerCount}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-blue-900 p-4 rounded-lg shadow-lg w-1/5">
                    <div className="flex items-center">
                      <AiOutlineUser className="text-4xl mr-2 text-white" />
                      <div>
                        <h3 className="text-xl font-serif text-white ">Supper Vendor</h3>
                        <p className="text-2xl font-serif text-white">{vendorCount}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-amber-900 p-4 rounded-lg shadow-lg w-1/5">
                    <div className="flex items-center">
                      <AiOutlineUser className="text-4xl mr-2 text-white" />
                      <div>
                        <h3 className="text-xl font-serif text-white ">Contractor</h3>
                        <p className="text-2xl font-serif text-white">{contractorCount}</p>
                      </div>
                    </div>
                  </div>
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
      </div>
  );
};

export default AdminPage;
