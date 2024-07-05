import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import axios from 'axios';
import Swal from 'sweetalert2';
import { PiBowlFoodBold } from 'react-icons/pi';
import Logout from '../Logout';

const Lunch = () => {
  const [inputValue, setInputValue] = useState('');
  const [lunchCount, setLunchCount] = useState('');
  const [customerData, setCustomerData] = useState(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  let token=null;
    useEffect(() => {
        token=localStorage.getItem('token');
        if(!token)
        {
            window.location.href="/loginerror";
        }

    },[]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/getCustomer/${inputValue}`);
      if (!response.ok) {
        Swal.fire({
          text: `Customer ${response.statusText}`,
          icon: "error",
        })
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCustomerData(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCountChange = (event) => {
    setLunchCount(event.target.value);
  };

  const updatelunchsCount = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/customer/lunch/${inputValue}`, { lunchCount });
      setCustomerData(response.data);
      Swal.fire({
        text: "Lunch Count Updated Successfully!",
        icon: "success"
      }).then(() => {
        window.location.reload();
      }
      )
      console.log(response.data);
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (

    <div className="flex items-center h-screen">
      <Sidebar />
      <div className="w-[70%] mx-auto ml-[25%]">
        <div className="pb-2 bg-white shadow-xl rounded-2xl">
          <div className="container flex flex-col items-center justify-center flex-1 p-4 mt-5 horizontal">
            <div className={`mb-11 rounded-full h-12 w-12 flex flex-col items-center justify-center bg-green-600 text-white font-bold  border-green-600"}`}>
              <span className="text-xl font-bold text-white"><PiBowlFoodBold className='w-7 h-7' /></span>
              <div className='absolute w-32 mt-16 text-xl font-bold text-center text-[#2e7120] uppercase'>Lunch</div>
            </div>
            <form onSubmit={handleSubmit} className="flex items-center justify-center flex-1 ">
              <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                className="p-2 border rounded "
                placeholder="Enter ID"
                autoFocus
              />
              <button type="submit" className="p-2 ml-2 font-semibold bg-[#2e7120] text-white rounded hover:bg-[#93c388] hover:text-black">
                Submit
              </button>
            </form>
            {customerData && (
              <table className="mt-2 ml-5 bg-white border align-center w-[95%]" id="table">
                <tbody>
                  <tr>
                    <th className="px-4 py-2 border">Id</th>
                    <td className="px-4 py-2 border">{customerData._id}</td>
                  </tr>
                  <tr>
                    <th className="px-4 py-2 border">Name</th>
                    <td className="px-4 py-2 border">{customerData.name}</td>
                  </tr>
                  <tr>
                    <th className="px-4 py-2 border">Mobile</th>
                    <td className="px-4 py-2 border">{customerData.phoneNumber}</td>
                  </tr>
                  <tr>
                    <th className="px-4 py-2 border">People Count</th>
                    <td className="px-4 py-2 border">{customerData.peopleCount}</td>
                  </tr>
                  <tr>
                    <th className="px-4 py-2 border">lunch Count</th>
                    <td className="px-4 py-2 border">
                      <form onSubmit={updatelunchsCount}>
                        <input
                          type="number"
                          value={lunchCount}
                          onChange={handleCountChange}
                          className="p-2 border rounded w-[45%]"
                          placeholder="Enter lunch count"
                          min={0}
                          max={customerData.peopleCount} autoFocus
                        />
                        <button type="submit" className="ml-2 p-2 font-semibold bg-[#2e7120] text-white rounded hover:bg-[#93c388] hover:text-black">
                          Update
                        </button>
                      </form>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <Logout />
    </div>
  );
};

export default Lunch;
