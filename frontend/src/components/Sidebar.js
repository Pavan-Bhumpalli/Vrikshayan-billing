import React, { useState } from 'react';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState('');

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-white text-green-800">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 bg-[#228b22] text-white">
        <span className="text-xl font-bold">VRIKSHAYAN</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1">
        <ul>
          <li
            className={`px-4 py-2 ${activeItem === 'dashboard' ? 'bg-[#228b22] text-white' : 'text-green-800'}`}
            onClick={() => handleItemClick('dashboard')}
          >
            <a href="#dashboard" className="flex items-center">
              <span className="ml-2">Dashboard</span>
              <span className="ml-auto bg-blue-500 text-xs text-white px-2 py-1 rounded-full">NEW</span>
            </a>
          </li>
          <li
            className={`px-4 py-2 ${activeItem === 'users' ? 'bg-[#228b22] text-white' : 'text-green-800'}`}
            onClick={() => handleItemClick('users')}
          >
            <a href="#users" className="flex items-center">
              <span className="ml-2">Users</span>
            </a>
          </li>
          <li
            className={`px-4 py-2 ${activeItem === 'settings' ? 'bg-[#228b22] text-white' : 'text-green-800'}`}
            onClick={() => handleItemClick('settings')}
          >
            <a href="#settings" className="flex items-center">
              <span className="ml-2">Settings</span>
            </a>
          </li>

          {/* Customers Section */}
          <li className="px-4 py-2 mt-4 text-gray-400">
            <span>Customers</span>
          </li>
          <li
            className={`px-4 py-2 ${activeItem === 'create' ? 'bg-[#228b22] text-white' : 'text-green-800'}`}
            onClick={() => handleItemClick('create')}
          >
            <a href="#create" className="flex items-center">
              <span className="ml-2">Create</span>
            </a>
          </li>
          <li
            className={`px-4 py-2 ${activeItem === 'details' ? 'bg-[#228b22] text-white' : 'text-green-800'}`}
            onClick={() => handleItemClick('details')}
          >
            <a href="#details" className="flex items-center">
              <span className="ml-2">Details</span>
            </a>
          </li>

          {/* Activities Section */}
          <li className="px-4 py-2 mt-4 text-gray-400">
            <span>Activities</span>
          </li>
          <li
            className={`px-4 py-2 ${activeItem === 'movies' ? 'bg-[#228b22] text-white' : 'text-green-800'}`}
            onClick={() => handleItemClick('movies')}
          >
            <a href="#movies" className="flex items-center">
              <span className="ml-2">Movies</span>
            </a>
          </li>
          <li
            className={`px-4 py-2 ${activeItem === 'lunch' ? 'bg-[#228b22] text-white' : 'text-green-800'}`}
            onClick={() => handleItemClick('lunch')}
          >
            <a href="#lunch" className="flex items-center">
              <span className="ml-2">Lunch</span>
            </a>
          </li>
          <li
            className={`px-4 py-2 ${activeItem === 'nursery' ? 'bg-[#228b22] text-white' : 'text-green-800'}`}
            onClick={() => handleItemClick('nursery')}
          >
            <a href="#nursery" className="flex items-center">
              <span className="ml-2">Nursery</span>
            </a>
          </li>
          <li
            className={`px-4 py-2 ${activeItem === 'farm-picking' ? 'bg-[#228b22] text-white' : 'text-green-800'}`}
            onClick={() => handleItemClick('farm-picking')}
          >
            <a href="#farm-picking" className="flex items-center">
              <span className="ml-2">Farm Picking</span>
            </a>
          </li>
          <li
            className={`px-4 py-2 ${activeItem === 'diy' ? 'bg-[#228b22] text-white' : 'text-green-800'}`}
            onClick={() => handleItemClick('diy')}
          >
            <a href="#diy" className="flex items-center">
              <span className="ml-2">DIY</span>
            </a>
          </li>
          <li
            className={`px-4 py-2 ${activeItem === 'beverages' ? 'bg-[#228b22] text-white' : 'text-green-800'}`}
            onClick={() => handleItemClick('beverages')}
          >
            <a href="#beverages" className="flex items-center">
              <span className="ml-2">Beverages</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
