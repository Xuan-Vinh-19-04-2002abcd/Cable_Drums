import React from 'react';

const UserAvatar = ({ username }) => {
    return (
        <div>
            <div className="w-24 h-24 rounded-full bg-cyan-800 mb-2 ml-3"></div>
            <p className="px-2 py-2 rounded-2xl font-bold text-white">{username}</p>
        </div>
    );
};

export default UserAvatar;