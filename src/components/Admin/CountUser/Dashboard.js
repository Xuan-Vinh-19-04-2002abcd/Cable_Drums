import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';

const InfoCard = ({ color, title, count }) => {
    return (
        <div className={`bg-${color} p-4 rounded-lg shadow-lg w-1/5`}>
            <div className="flex items-center">
                <AiOutlineUser className="text-4xl mr-2 text-white" />
                <div>
                    <h3 className="text-xl font-serif text-white">{title}</h3>
                    <p className="text-2xl font-serif text-white">{count}</p>
                </div>
            </div>
        </div>
    );
};

const Dashboard = ({ plannerCount, vendorCount, contractorCount }) => {
    return (
           <>
               <InfoCard color="black" title="Planner" count={plannerCount} />
               <InfoCard color="blue-500" title="Supper Vendor" count={vendorCount} />
               <InfoCard color="amber-900" title="Contractor" count={contractorCount} />
           </>

    );
};

export default Dashboard;
