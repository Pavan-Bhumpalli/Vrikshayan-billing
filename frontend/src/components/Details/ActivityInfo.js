import React, { useState } from 'react';
import { FaPaintBrush } from 'react-icons/fa';
import { RiPlantFill } from 'react-icons/ri'; 
import { RiDrinks2Fill } from "react-icons/ri";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function ActivityInfo({ id, type }) {
  const [activityData, setActivityData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/getCustomer/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      switch (type) {
        case 'nursery':
          setActivityData(data.activities.nurseryCount || []);
          break;
        case 'diy':
          setActivityData(data.activities.diyCount || []);
          break;
        case 'beverages':
          setActivityData(data.activities.beverages || []);
          break;
        default:
          setActivityData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const showAlert = async () => {
    await fetchData();
    MySwal.fire({
      title: 'Vrikshayan',
      html: (
        <div id="printableArea" className="mx-auto mt-5">
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
              {Array.isArray(activityData) && activityData.length > 0 ? (
                activityData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2">{item.diy_pk || item.item_Pk}</td>
                    <td className="px-4 py-2">{item.name || item.name}</td>
                    <td className="px-4 py-2">{item.cost || item.price}</td>
                    <td className="px-4 py-2">{item.count || item.quantity}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-center">
                    No data available
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      ),
      confirmButtonText: 'Close',
    });
  };

  return (
    <div className="flex">
      {type === 'nursery' && <RiPlantFill className="cursor-pointer" onClick={showAlert} title="Click me" />}
      {type === 'diy' && <FaPaintBrush className="cursor-pointer" onClick={showAlert} title="Click me" />}
      {type === 'beverages' && <RiDrinks2Fill className="cursor-pointer" onClick={showAlert} title="Click me" />}
    </div> 
  );
}

export default ActivityInfo;
