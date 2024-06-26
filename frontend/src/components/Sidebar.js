import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'; // assuming you are using react-router-dom
import dashboard from '../images/dashboard.png';
import { FaCirclePlus } from "react-icons/fa6";
import { IoListCircle } from "react-icons/io5";
import { RiMovie2Fill, RiPlantFill, RiDrinks2Fill } from "react-icons/ri";
import { PiBowlFoodBold } from "react-icons/pi";
import { FaPaintBrush } from "react-icons/fa";
import { FaRupeeSign } from "react-icons/fa";

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
    <div className="fixed flex flex-col flex-shrink-0 min-h-screen w-[20%] text-white shadow-lg">
      <div className="flex items-center justify-center h-30 text-white shadow-md">
        <a href="/dashboard">
          <img src={dashboard} alt="logo" className="p-4 object-contain"  />
        </a>
      </div>

      <nav className="flex-1 items-start pt-2" style={{ background: "linear-gradient(1deg, rgba(21, 128, 51, 1) 0%, rgba(34, 139, 34, 0.7) 100%)" }}>
        <ul className="flex flex-col justify-evenly h-full items-start">
          <li className="px-4 py-2 text-[#481E14] font-bold text-lg">

            <span className='text-[24px]'>CUSTOMERS</span>
          </li>
          <li
            className={`px-4 py-2 cursor-pointer transition-colors duration-200 text-[24px] w-full ${activeItem === 'create' ? 'text-green-800 bg-white' : ' hover:bg-green-500 text-white'
              }`}
            onClick={() => handleItemClick('create')}
          >
            <a href="/createCustomer" className="flex items-center gap-2">
              <FaCirclePlus className='inline '/>
              <span className="">&nbsp;Create</span>
            </a>
          </li>
          <li
            className={`px-4 py-2 cursor-pointer transition-colors duration-200 text-[24px] w-full ${activeItem === 'details' ? 'text-green-800 bg-white' : ' hover:bg-green-500 text-white'
              }`}
            onClick={() => handleItemClick('details')}
          >
            <a href="/details" className="flex items-center gap-2">
            <IoListCircle className='inline w-7 h-7'/>
              <span className="">Details</span>
            </a>
          </li>

          <li className="px-4 py-2 text-[#481E14] font-bold text-lg">
            <span className='text-[24px]'>ACTIVITIES</span>
          </li>
          <li
            className={`px-4 py-2 cursor-pointer transition-colors duration-200 text-[24px] w-full ${activeItem === 'movies' ? 'text-green-800 bg-white' : ' hover:bg-green-500 text-white'
              }`}
            onClick={() => handleItemClick('movies')}
          >
            <a href="/movies" className="flex items-center gap-2">
              <RiMovie2Fill className='inline w-6 h-6'/>
              <span className="">Movies</span>
            </a>
          </li>
          <li
            className={`px-4 py-2 cursor-pointer transition-colors duration-200 text-[24px] w-full ${activeItem === 'lunch' ? 'text-green-800 bg-white' : ' hover:bg-green-500 text-white'
              }`}
            onClick={() => handleItemClick('lunch')}
          >
            <a href="/lunch" className="flex items-center gap-2">
            <PiBowlFoodBold className='inline w-7 h-7'/>
              <span className="">Lunch</span>
            </a>
          </li>
          <li
            className={`px-4 py-2 cursor-pointer transition-colors duration-200 text-[24px] w-full ${activeItem === 'nursery' ? 'text-green-800 bg-white' : ' hover:bg-green-500 text-white'
              }`}
            onClick={() => handleItemClick('nursery')}
          >
            <a href="#nursery" className="flex items-center gap-2">
            <RiPlantFill className='inline w-7 h-7' />
              <span className="">Nursery</span>
            </a>
          </li>
          
          <li
            className={`px-4 py-2 cursor-pointer transition-colors duration-200 text-[24px] w-full ${activeItem === 'diy' ? 'text-green-800 bg-white' : ' hover:bg-green-500 text-white'
              }`}
            onClick={() => handleItemClick('diy')}
          >
            <a href="#diy" className="flex items-center gap-2">
              <FaPaintBrush className='inline w-6 h-6'/>
              <span className="">DIY</span>
            </a>
          </li>
          <li
            className={`px-4 py-2 cursor-pointer transition-colors duration-200 text-[24px] w-full ${activeItem === 'beverages' ? 'text-green-800 bg-white' : ' hover:bg-green-500 text-white'
              }`}
            onClick={() => handleItemClick('beverages')}
          >
            <a href="#beverages" className="flex items-center gap-2">
              <RiDrinks2Fill className='inline w-6 h-6'/>
              <span className="">Beverages</span>
            </a>
          </li>
          <li
            className={`px-4 py-2 cursor-pointer transition-colors duration-200 text-[24px] w-full ${activeItem === 'farm-picking' ? 'text-green-800 bg-white' : ' hover:bg-green-500 text-white'
              }`}
            onClick={() => handleItemClick('farm-picking')}
          >
            <a href="#farm-picking" className="flex items-center gap-2">
              <FaRupeeSign className='inline w-6 h-6'/>
              <span className="">Final Billing</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
