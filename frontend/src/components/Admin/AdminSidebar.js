import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../../images/dashboard.png'

const AdminSidebar = () => {

  const location = useLocation();
  const [activeItem, setActiveItem] = useState('');

  useEffect(() => {
    const path = location.pathname;
    if (path === '/user') {
      setActiveItem('user');
    } else if (path === '/nursery') {
      setActiveItem('nursery');
    } else if (path.includes('/beverages')) {
      setActiveItem('beverages');
    } else if (path.includes('/statistics')) {
      setActiveItem('statistics');
    }
  }, [location.pathname]);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  
  return (
    <div className='flex flex-col items-center h-[100vh] w-[18rem]'>
        <div className='w-full h-[100px]'> 
            <img src={logo} alt='logo' className='w-full h-full'/>
        </div>
        <div className='flex flex-col justify-evenly items-center text-xl text-white font-medium w-full flex-1 text-center' style={{ background: "linear-gradient(1deg, rgba(21, 128, 51, 1) 0%, rgba(34, 139, 34, 0.7) 100%)" }}>
          <div className={`w-full p-10 ${activeItem === 'users' ? 'text-green-800 bg-white' : ' hover:bg-green-500 text-white'}`} onClick={() => handleItemClick('users')}>
            <p>USERS</p>
          </div>
          <div className={`w-full p-10 ${activeItem === 'nursery' ? 'text-green-800 bg-white' : ' hover:bg-green-500 text-white'}`} onClick={() => handleItemClick('nursery')}>
            <p>NURSERY</p>
          </div>
          <div className={`w-full p-10 ${activeItem === 'beverages' ? 'text-green-800 bg-white' : ' hover:bg-green-500 text-white'}`} onClick={() => handleItemClick('beverages')}>
            <p>BEVERAGES</p>
          </div>
          <div className={`w-full p-10 ${activeItem === 'farmproduce' ? 'text-green-800 bg-white' : ' hover:bg-green-500 text-white'}`} onClick={() => handleItemClick('farmproduce')}>
            <p>FARM PRODUCE</p>
          </div>
          <div className={`w-full p-10 ${activeItem === 'statistics' ? 'text-green-800 bg-white' : ' hover:bg-green-500 text-white'}`} onClick={() => handleItemClick('statistics')}>
            <p>STATISTICS</p>
          </div>

        </div>

    </div>
  )
}

export default AdminSidebar