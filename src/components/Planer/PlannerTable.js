import React from 'react';
import TableHeader from "./PlannerTable/PlannerHeaderComponent";
import TableRow from "./PlannerTable/TableRow";
const ContractTable = ({ contracts }) => {
    return (
        <table className="w-[80%] border border-gray-300 mx-auto shadow-md">
            <TableHeader />
            <tbody>
            {contracts.map((contract) => (
                <TableRow key={contract._id} contract={contract} />
            ))}
            </tbody>
        </table>
    );
};
export default ContractTable