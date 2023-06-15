import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../../Config/Config';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [showModel, setShowModel] = useState(false);
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      redirectToRole(user.role);
    }
  }, []);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    validateEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    validatePassword(event.target.value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(email);
    setEmailError(isValid ? '' : 'Invalid email');
    return isValid;
  };

  const validatePassword = (password) => {
    const isValid = password.length >= 6;
    setPasswordError(isValid ? '' : 'Invalid password');
    return isValid;
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/login`, {
        email: email,
        password: password,
      });

      const { user, token } = response.data;

      if (user && token) {
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        localStorage.setItem('token', token);
        redirectToRole(user.role);
      } else {

      }
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle the error if necessary
      setShowModel(true);
      setEmail("");
      setPassword("");
      setTimeout(() => {
        setShowModel(false);
      }, 3000);
    }
  };

  const redirectToRole = (role) => {
    switch (role) {
      case 'Admin':
        navigate('/admin');
        break;
      case 'Vendor':
        navigate('/vendor');
        break;
      case 'Planner':
        navigate('/planner');
        break;
      case 'Contractor':
        navigate('/contractor');
        break;
      default:
        break;
    }
  };

  return (
      <div className=" bg-no-repeat bg-cover h-screen w-screen flex items-center justify-center bg-[url('https://media.istockphoto.com/id/1218851416/vi/anh/tr%E1%BB%91ng-d%E1%BA%A7u-ng%E1%BB%93i-tr%C3%AAn-m%E1%BB%99t-b%E1%BA%A3ng-giao-d%E1%BB%8Bch-%C4%91ang-cho-th%E1%BA%A5y-m%E1%BB%99t-s%E1%BB%B1-s%E1%BB%A5p-%C4%91%E1%BB%95-th%E1%BB%8B-tr%C6%B0%E1%BB%9Dng-ch%E1%BB%A9ng-kho%C3%A1n.webp?b=1&s=170667a&w=0&k=20&c=evL9Dc4jnerZjgnvvCo-P5MgQmSyP2BVAqMg49poGTA=')]">
        <form
            onSubmit={handleLogin}
            className="w-1/2 mx-auto bg-black bg-opacity-80 rounded-lg py-5 md:h-[400px] flex flex-row justify-evenly items-center"
        >
        <div className="bg-[url('https://media.istockphoto.com/id/1386523365/vi/anh/hai-th%C3%B9ng-d%E1%BA%A7u-v%C3%A0ng-tr%C3%AAn-m%C3%A0n-h%C3%ACnh-k%E1%BB%B9-thu%E1%BA%ADt-s%E1%BB%91.webp?b=1&s=170667a&w=0&k=20&c=duRSQzTUPWgmREbzCrGk6z3TE1_URifjPeJdxjNjCps=')] w-1/2 h-[100%] bg-no-repeat bg-cover">

        </div>
          <div>
            <div className="text-2xl mb-4 text-orange-300 font-mono">LOGIN TO ACCOUNT</div>
            <div className="mb-4">
              <label
                  htmlFor="email"
                  className="block text-white text-lg mb-2 font-bold font-mono"
              >
                Email
              </label>
              <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className="block w-full py-2 px-4 border border-gray-300 rounded-md bg-transparent text-white focus:outline-none focus:border-blue-500 font-mono"
              />
              {emailError && <p className="text-red-500">{emailError}</p>}
            </div>
            <div className="mb-6">
              <label
                  htmlFor="password"
                  className="block text-white text-lg mb-2 font-bold font-mono"
              >
                Password
              </label>
              <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="block w-full py-2 px-4 border border-gray-300 rounded-md bg-transparent text-white focus:outline-none focus:border-blue-500"
              />
              {passwordError && <p className="text-red-500">{passwordError}</p>}
            </div>
            <div className="flex items-center justify-center">
              <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-10 rounded focus:outline-none focus:shadow-outline font-mono"
              >
                Login
              </button>
            </div>
          </div>
        </form>
        {showModel && (
            <div className="fixed bottom-4 right-1/3 top-2 w-1/4 h-[8%] bg-black rounded-md shadow-md p-4">
              <p className="text-red-500 flex justify-center items-center ">Invalid Email or Password!</p>
            </div>
        )}
      </div>
  );
};

export default LoginForm;
