import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Details = ({ pk, next }) => {
  const [userData, setUserData] = useState({});

  const loadData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/getCustomer/${pk}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, [pk]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    next();
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        submitHandler(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
        <div className='flex items-center justify-center'>
        <table className="bg-white border shadow w-[80%]" id="table">
            <tbody>
              <tr>
                <th className="py-2 px-4 border rounded">Pk</th>
                <td className="py-2 px-4 border rounded">{userData.pk}</td>
              </tr>
              <tr>
                <th className="py-2 px-4 border">Name</th>
                <td className="py-2 px-4 border">{userData.name}</td>
              </tr>
              <tr>
                <th className="py-2 px-4 border">Mobile</th>
                <td className="py-2 px-4 border">{userData.phoneNumber}</td>
              </tr>
              <tr>
                <th className="py-2 px-4 border">People Count</th>
                <td className="py-2 px-4 border">{userData.peopleCount}</td>
              </tr>
              
            </tbody>
          </table>
        </div>
  );
};

export default Details;
