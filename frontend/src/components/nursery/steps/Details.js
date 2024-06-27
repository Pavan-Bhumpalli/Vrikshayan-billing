import React from 'react';

const Details = ({ userData }) => {
  console.log(userData);
    return (
        <div className="flex flex-col">
            <div className="flex-1 w-full mx-2">
                <div className="h-6 mt-3 text-xs font-bold leading-8 text-gray-500 uppercase">
                    Details
                </div>
                <div className="flex p-1 my-2 bg-white border border-gray-200 rounded">
                    <div>{userData.userName}</div>
                </div>
            </div>
        </div>
    );
};

export default Details;
