import React, { useState } from 'react';

const Account = ({ onNext }) => {
    const [username, setUsername] = useState('');

    const handleChange = (e) => {
        setUsername(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onNext({ username });
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
                            type="text"
                            value={username}
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
