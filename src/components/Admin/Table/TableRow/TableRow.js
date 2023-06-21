
import { AiOutlineDelete } from 'react-icons/ai';
const TableRow = ({ user, index, handleDelete }) => {
    return (
        <tr key={user._id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
            <td className="text-center font-mono py-1">{index + 1}</td>
            <td className="text-center font-mono">{user.username}</td>
            <td className="text-center font-mono">{user.role}</td>
            <td className="text-center font-bold">
                <button onClick={() => handleDelete(user._id)}>
                    <AiOutlineDelete />
                </button>
            </td>
        </tr>
    );
};

export default TableRow;
