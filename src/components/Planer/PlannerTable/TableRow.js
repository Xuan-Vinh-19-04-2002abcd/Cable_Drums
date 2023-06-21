const TableRow = ({ contract }) => {
    return (
        <tr key={contract._id}>
            <td className="py-2 px-4 border text-center text-white">{contract.startDate}</td>
            <td className="py-2 px-4 border text-center text-white">{contract.endDate}</td>
            <td className="py-2 px-4 border text-center text-white">{Math.floor((new Date(contract.endDate)- new Date())/(1000 * 60 * 60 * 24))} days</td>
            <td className="py-2 px-4 border text-center text-white">{contract.contractAmount}</td>
            <td className="py-2 px-4 border text-center text-white">{contract.username}</td>
            <td className="py-2 px-4 border text-center text-white"><p className="bg-red-600 rounded-md">Active</p></td>
        </tr>
    );
};
export default TableRow;