const TableHeader = () => {
    return (
        <thead className="bg-gray-200 text-gray-700">
        <tr>
            <th className="py-2 px-4">STT</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Role</th>
            <th className="py-2 px-4">Action</th>
        </tr>
        </thead>
    );
};
export default TableHeader;