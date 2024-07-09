import React, { useState, useEffect } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import logo from '../../images/dashboard.png';
import { FaUserAlt } from "react-icons/fa";
import { GiFruitBowl } from "react-icons/gi";
import { RiPlantFill, RiDrinks2Fill } from "react-icons/ri";
import { FaPaintBrush } from "react-icons/fa";
import { BsGraphUpArrow } from "react-icons/bs";
import Swal from 'sweetalert2';

const AdminSidebar = () => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        text: 'You are not logged in!',
        icon: 'error'
      }).then(() => {
        return <Navigate to="/loginerror" />;
      });
    }
  }, []);

  useEffect(() => {
    const path = location.pathname;
    if (path === '/allusers') {
      setActiveItem('users');
    } else if (path === '/nurseryAdmin') {
      setActiveItem('nursery');
    } else if (path === '/diyAdmin') {
      setActiveItem('diy');
    } else if (path === '/beveragesAdmin') {
      setActiveItem('beverages');
    } else if (path === '/farmProduceAdmin') {
      setActiveItem('farmproduce');
    } else if (path === '/statistics') {
      setActiveItem('statistics');
    }
  }, [location.pathname]);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className='flex flex-col items-center w-[20%] min-h-screen fixed'>
      <div className='w-full h-[100px]'> 
        <img src={logo} alt='logo' className='w-full h-full'/>
      </div>
      <div className='flex flex-col justify-evenly items-center text-lg text-white font-medium w-full flex-1 text-center' style={{ background: "linear-gradient(1deg, rgba(21, 128, 51, 1) 0%, rgba(34, 139, 34, 0.7) 100%)" }}>
        <div className="text-[#481E14] font-bold text-lg items-start">
          <span className='text-[24px]'>ADMIN</span>
        </div>
        <a href='/allusers' className={`flex w-full p-4 gap-2 ${activeItem === 'users' ? 'text-green-800 bg-white' : ' hover:bg-green-500 text-white'}`} onClick={() => handleItemClick('users')}>
          <FaUserAlt className='pt-1 w-6 h-6'/>
          <p>USERS</p>
        </a>
        <a href='/nurseryAdmin' className={`flex gap-2 w-full p-4 ${activeItem === 'nursery' ? 'text-green-800 bg-white' : ' hover:bg-green-500 text-white'}`} onClick={() => handleItemClick('nursery')}>
          <RiPlantFill className='inline w-7 h-7' />
          <p>NURSERY</p>
        </a>
        <a href='/diyAdmin' className={`flex gap-2 w-full p-4 ${activeItem === 'diy' ? 'text-green-800 bg-white' : ' hover:bg-green-500 text-white'}`} onClick={() => handleItemClick('diy')}>
          <FaPaintBrush className='inline w-6 h-6'/>
          <p>DIY</p>
        </a>
        <a href='/bevaragesAdmin' className={`flex gap-2 w-full p-4 ${activeItem === 'beverages' ? 'text-green-800 bg-white' : ' hover:bg-green-500 text-white'}`} onClick={() => handleItemClick('beverages')}>
          <RiDrinks2Fill className='inline w-6 h-6'/>
          <p>BEVERAGES</p>
        </a>
        <a href='/farmProduceAdmin' className={`flex gap-2 w-full p-4 ${activeItem === 'farmproduce' ? 'text-green-800 bg-white' : ' hover:bg-green-500 text-white'}`} onClick={() => handleItemClick('farmproduce')}>
          <GiFruitBowl className=' w-7 h-7'/>
          <p>FARM PRODUCE</p>
        </a>
        <a href='/statistics' className={`flex gap-2 w-full p-4 ${activeItem === 'statistics' ? 'text-green-800 bg-white' : ' hover:bg-green-500 text-white'}`} onClick={() => handleItemClick('statistics')}>
          <BsGraphUpArrow className='inline w-6 h-6'/>
          <p>STATISTICS</p>
        </a>
      </div>
    </div>
  );
}

export default AdminSidebar;
