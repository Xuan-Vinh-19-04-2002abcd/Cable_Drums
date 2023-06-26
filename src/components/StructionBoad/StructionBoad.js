import React from "react";

const StructionBoad = () =>{
    return (
        <>
            <div className="flex items-center w-[85%] mx-auto">
                <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 font-mono">Planner created request</h2>

                    <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <div className="flex-1 ml-4">
                            <h3 className="text-lg font-mono">Vendor received request</h3>
                            <p className="text-gray-500 font-mono ">Status: New </p>
                        </div>
                    </div>

                    <div className="flex items-center mt-4">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <div className="flex-1 ml-4">
                            <h3 className="text-lg font-mono">Vendor updated request</h3>
                            <p className="text-gray-500 font-mono ">Status: New ----> Ready to collect</p>
                        </div>
                    </div>

                    <div className="flex items-center mt-4">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <div className="flex-1 ml-4">
                            <h3 className="text-lg font-mono">Waiting for project contractor approval</h3>
                            <p className="text-gray-500 font-mono ">Status: Really to collect ---> Collected</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default StructionBoad