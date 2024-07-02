import React, { useState } from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function DiyDetails({ id }) {
  const [diyData, setDiyData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/getCustomer/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDiyData(data.activities.diyCount || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const showAlert = async () => {
    await fetchData();
    MySwal.fire({
      title: 'Vrikshayan',
      html: (
        <div
          id="printableArea"
          className=" mx-auto mt-5"
        >
          <table className="min-w-full bg-white border rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="px-4 py-2 text-left">Id</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Cost</th>
                <th className="px-4 py-2 text-left">Count</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(diyData) && diyData.length > 0 ? (
                diyData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{item.diy_pk}</td>
                    <td className="px-4 py-2">{item.name}</td>
                    <td className="px-4 py-2">{item.cost}</td>
                    <td className="px-4 py-2">{item.count}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-center">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ),
      confirmButtonText: 'Ok',
    });
  };

  return (
    <div className="flex">
      <FaPaintBrush onClick={showAlert} className="cursor-pointe" />
    </div>
  );
}

export default DiyDetails;
