import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


const Details = ({ pk, next, prev }) => {
  const [userData, setUserData] = useState({});

  const loadData = async () => {
    try {
      const response = await axios.get(`https://vrikshayan-billing-api.vercel.app/getCustomer/${pk}`);
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        text: `Customer not found`,
        icon: "error",
      }).then(() => {
        prev();
      })
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
            <th className="px-4 py-2 border rounded">Pk</th>
            <td className="px-4 py-2 border rounded">{userData.pk}</td>
          </tr>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <td className="px-4 py-2 border">{userData.name}</td>
          </tr>
          <tr>
            <th className="px-4 py-2 border">Mobile</th>
            <td className="px-4 py-2 border">{userData.phoneNumber}</td>
          </tr>
          <tr>
            <th className="px-4 py-2 border">People Count</th>
            <td className="px-4 py-2 border">{userData.peopleCount}</td>
          </tr>

        </tbody>
      </table>
    </div>
  );
};

export default Details;
