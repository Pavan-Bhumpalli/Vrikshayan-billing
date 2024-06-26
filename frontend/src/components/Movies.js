import React, { useState } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import Swal from 'sweetalert2';

const Movie = () => {
  const [inputValue, setInputValue] = useState('');
  const [movieCount, setMovieCount] = useState('');
  const [customerData, setCustomerData] = useState(null);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/getCustomer/${inputValue}`);
      if (!response.ok) {
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
    setMovieCount(event.target.value);
  };

  const updateMoviesCount = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/customer/movies/${inputValue}`, { movieCount });
      setCustomerData(response.data);
      Swal.fire({
        text: "Movies Count Updated Successfully!",
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
      <div className='flex flex-1 flex-col justify-center items-center  '>
        <form onSubmit={handleSubmit} className="flex flex-1 justify-center items-center">
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            className=" p-2 border rounded"
            placeholder="Enter ID"
          />
          <div >
          <button type="submit" className=" font-semibold ml-2 p-2 bg-[#2e7120] text-white rounded hover:bg-[#93c388] hover:text-black">
            Submit
          </button>
          </div>
        </form>
        {customerData && (
          <table className="bg-white border " id="table">
            <tbody>
              <tr>
                <th className="py-2 px-4 border">Id</th>
                <td className="py-2 px-4 border">{customerData._id}</td>
              </tr>
              <tr>
                <th className="py-2 px-4 border">Name</th>
                <td className="py-2 px-4 border">{customerData.name}</td>
              </tr>
              <tr>
                <th className="py-2 px-4 border">Mobile</th>
                <td className="py-2 px-4 border">{customerData.phoneNumber}</td>
              </tr>
              <tr>
                <th className="py-2 px-4 border">People Count</th>
                <td className="py-2 px-4 border">{customerData.peopleCount}</td>
              </tr>
              <tr>
                <th className="py-2 px-4 border">Movie Count</th>
                <td className="py-2 px-4 border">
                  <form onSubmit={updateMoviesCount}>
                    <input
                      type="number"
                      value={movieCount}
                      onChange={handleCountChange}
                      className="p-2 border rounded"
                      placeholder="Enter movie count"
                    />
                    <button type="submit" className="font-semibold ml-2 p-2 bg-[#2e7120] text-white rounded hover:bg-[#93c388] hover:text-black">
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
  );
};

export default Movie;
