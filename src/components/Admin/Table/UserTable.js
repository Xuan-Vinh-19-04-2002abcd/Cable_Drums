import React from 'react';
import TableHeader from "./TableHeader/TableHeader";
import TableRow from "./TableRow/TableRow";

const UserTable = ({ filteredUsers, handleDelete }) => {
    return (
        <table className="w-[50%] bg-white shadow-md rounded my-4 mx-auto">
            <TableHeader />
            <tbody className="text-gray-600">
            {filteredUsers.map((user, index) => (
                <TableRow
                    key={user._id}
                    user={user}
                    index={index}
                    handleDelete={handleDelete}
                />
            ))}
            </tbody>
        </table>
    );
};
export default UserTable;
