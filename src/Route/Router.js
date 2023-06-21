// CustomSwitch.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminPage from '../Pages/AdminPage';
import LoginForm from '../Pages/LoginPage';
import Planner from '../Pages/Planer';
import Contractor from '../Pages/Contractor';
import Vendor from '../Pages/Vendor';
const CustomSwitch = () => {

  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/planner" element={<Planner />} />
      <Route path="/contractor" element={<Contractor />} />
      <Route path="/vendor" element={<Vendor />} />
    </Routes>

  );
};

export default CustomSwitch;
