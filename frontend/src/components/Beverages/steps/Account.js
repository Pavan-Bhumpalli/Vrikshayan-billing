import React, { useState } from 'react';
import Details from './Details';

const Account = ({ setPk, next }) => {

    const handleChange = (e) => {
        setPk(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        next();
    };

    return (
        <div className="flex flex-col">
            <div className="flex-1 w-full mx-2">
                <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-500 uppercase">
                    Id
                </div>
                <div className="flex p-1 my-2 bg-white border border-gray-200 rounded">
                    <form onSubmit={handleSubmit} className="w-full">
                        <input
                            autoFocus
                            type="text"
                            onChange={handleChange}
                            placeholder="Enter Id"
                            className="w-full p-1 px-2 text-gray-800 outline-none appearance-none"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Account;
