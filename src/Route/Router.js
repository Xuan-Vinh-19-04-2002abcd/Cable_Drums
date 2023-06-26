import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminPage from '../Pages/AdminPage';
import LoginPage from '../Pages/LoginPage';
import Planner from '../Pages/Planer';
import Contractor from '../Pages/Contractor';
import Vendor from '../Pages/Vendor';

const PrivateRoute = ({ path, element }) => {
    const token = localStorage.getItem('token');
    return token ? element : <Navigate to="/" replace />;
};

const CustomSwitch = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
                path="/admin/*"
                element={<PrivateRoute element={<AdminPage />} />}
            />
            <Route
                path="/planner/*"
                element={<PrivateRoute element={<Planner />} />}
            />
            <Route
                path="/contractor/*"
                element={<PrivateRoute element={<Contractor />} />}
            />
            <Route
                path="/vendor/*"
                element={<PrivateRoute element={<Vendor />} />}
            />
        </Routes>
    );
};

export default CustomSwitch;
