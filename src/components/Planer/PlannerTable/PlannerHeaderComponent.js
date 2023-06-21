const TableHeader = () => {
    return (
        <thead>
        <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Start Date</th>
            <th className="py-2 px-4 border">End Date</th>
            <th className="py-2 px-4 border">Contract expiration</th>
            <th className="py-2 px-4 border">Amount of Cable Drum</th>
            <th className="py-2 px-4 border">Vendor</th>
            <th className="py-2 px-4 border">Status</th>
        </tr>
        </thead>
    );
};
export default TableHeader;