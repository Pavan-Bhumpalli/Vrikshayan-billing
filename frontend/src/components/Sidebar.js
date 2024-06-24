import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // assuming you are using react-router-dom

const Sidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    const path = location.pathname;
    if (path === '/createCustomer') {
      setActiveItem('create');
    } else if (path === '/details') {
      setActiveItem('details');
    } else if (path.includes('/movies')) {
      setActiveItem('movies');
    } else if (path.includes('/lunch')) {
      setActiveItem('lunch');
    } else if (path.includes('/nursery')) {
      setActiveItem('nursery');
    } else if (path.includes('/farm-picking')) {
      setActiveItem('farm-picking');
    } else if (path.includes('/diy')) {
      setActiveItem('diy');
    } else if (path.includes('/beverages')) {
      setActiveItem('beverages');
    }
  }, [location.pathname]);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-green-900 text-white shadow-lg">
      <div className="flex items-center justify-center h-20 text-white bg-green-800 shadow-md">
        <a href="/dashboard">
          <span className="ml-2 font-extrabold text-3xl tracking-wider">VRIKSHAYAN</span>
        </a>
      </div>

      <nav className="flex-1 bg-[#82A762] overflow-y-auto">
        <ul className="space-y-2">
          <div className="border-2 border-green-700 m-2 rounded-lg shadow-sm">
            <li className="px-4 py-2 bg-green-700 text-black font-bold text-lg rounded-t-lg">
              <span>Customers</span>
            </li>
            <li
              className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${
                activeItem === 'create' ? 'text-green-800 bg-white' : 'bg-green-600 hover:bg-green-500 text-white'
              }`}
              onClick={() => handleItemClick('create')}
            >
              <a href="/createCustomer" className="flex items-center">
                <span className="ml-2">Create</span>
              </a>
            </li>
            <li
              className={` rounded-b-lg px-4 py-2 cursor-pointer transition-colors duration-200 ${
                activeItem === 'details' ? 'text-green-800 bg-white' : 'bg-green-600 hover:bg-green-500 text-white'
              }`}
              onClick={() => handleItemClick('details')}
            >
              <a href="#details" className="flex items-center">
                <span className="ml-2">Details</span>
              </a>
            </li>
          </div>

          <div className="border-2 border-green-700 m-2 rounded-lg shadow-sm">
            <li className="px-4 py-2 bg-green-700 text-black font-bold text-lg rounded-t-lg">
              <span>Activities</span>
            </li>
            <li
              className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${
                activeItem === 'movies' ? 'text-green-800 bg-white' : 'bg-green-600 hover:bg-green-500 text-white'
              }`}
              onClick={() => handleItemClick('movies')}
            >
              <a href="#movies" className="flex items-center">
                <span className="ml-2">Movies</span>
              </a>
            </li>
            <li
              className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${
                activeItem === 'lunch' ? 'text-green-800 bg-white' : 'bg-green-600 hover:bg-green-500 text-white'
              }`}
              onClick={() => handleItemClick('lunch')}
            >
              <a href="#lunch" className="flex items-center">
                <span className="ml-2">Lunch</span>
              </a>
            </li>
            <li
              className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${
                activeItem === 'nursery' ? 'text-green-800 bg-white' : 'bg-green-600 hover:bg-green-500 text-white'
              }`}
              onClick={() => handleItemClick('nursery')}
            >
              <a href="#nursery" className="flex items-center">
                <span className="ml-2">Nursery</span>
              </a>
            </li>
            <li
              className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${
                activeItem === 'farm-picking' ? 'text-green-800 bg-white' : 'bg-green-600 hover:bg-green-500 text-white'
              }`}
              onClick={() => handleItemClick('farm-picking')}
            >
              <a href="#farm-picking" className="flex items-center">
                <span className="ml-2">Farm Picking</span>
              </a>
            </li>
            <li
              className={`px-4 py-2 cursor-pointer transition-colors duration-200 ${
                activeItem === 'diy' ? 'text-green-800 bg-white' : 'bg-green-600 hover:bg-green-500 text-white'
              }`}
              onClick={() => handleItemClick('diy')}
            >
              <a href="#diy" className="flex items-center">
                <span className="ml-2">DIY</span>
              </a>
            </li>
            <li
              className={` rounded-b-lg px-4 py-2 cursor-pointer transition-colors duration-200 ${
                activeItem === 'beverages' ? 'text-green-800 bg-white' : 'bg-green-600 hover:bg-green-500 text-white'
              }`}
              onClick={() => handleItemClick('beverages')}
            >
              <a href="#beverages" className="flex items-center">
                <span className="ml-2">Beverages</span>
              </a>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
