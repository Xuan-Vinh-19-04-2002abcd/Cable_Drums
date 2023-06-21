import React from 'react';

const Input = ({ type, value, onChange, error, label }) => {
    return (
        <div className="mb-4">
            <label htmlFor={type} className="block text-white text-lg mb-2 font-bold font-mono">
                {label}
            </label>
            <input
                type={type}
                id={type}
                value={value}
                onChange={onChange}
                className="block w-full py-2 px-4 border border-gray-300 rounded-md bg-transparent text-white focus:outline-none focus:border-blue-500 font-mono"
            />
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default Input;
