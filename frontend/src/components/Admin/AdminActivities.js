import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';
import { MdAdd } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import swal from 'sweetalert2';

const AdminActivities = ({ type, inp }) => {
  const [data, setData] = useState([]);

  const loadUsers = async () => {
    const response = await axios.get(`http://localhost:5000/${type}`);
    setData(response.data);
  };

  useEffect(() => {
    loadUsers();
  }, [type]);

  const addNewItem = async () => {
    const { value: formValues } = await swal.fire({
      title: 'Add New Item',
      html: `
        <input type='text' id='name' class='swal2-input' placeholder='Name'>
        <input type='number' id='cost' class='swal2-input' placeholder='Cost'>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Add Item',
      preConfirm: () => {
        return {
          name: document.getElementById('name').value,
          cost: document.getElementById('cost').value
        }
      }
    });

    if (formValues) {
      try {
        const response = await axios.post(`http://localhost:5000/${inp}`, formValues);
        setData(prevData => [...prevData, response.data]);
        swal.fire('Added!', 'Your item has been added.', 'success');
      } catch (error) {
        swal.fire('Error', 'There was a problem adding your item.', 'error');
      }
    }
  };

  return (
    <div className='flex '>
      <AdminSidebar />
      <div className='flex flex-col w-full p-8'>
        <div className='flex justify-end mb-4'>
          <button onClick={addNewItem} className='flex items-center font-semibold bg-[#228b22] text-white px-4 py-2 rounded hover:bg-[#165816]'>
            <MdAdd className='inline w-6 h-6 mr-2' />
            <span>Create</span>
          </button>
        </div>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white shadow-md rounded'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='py-2 px-4 border'>Pk</th>
                <th className='py-2 px-4 border'>Name</th>
                <th className='py-2 px-4 border'>Cost</th>
                <th className='py-2 px-4 border'>Edit</th>
                <th className='py-2 px-4 border'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id} className='text-center border-t'>
                  <td className='py-2 px-4 border'>{item.nursery_pk || item.item_pk || item.beverageId || item.produce_pk || item.diy_pk}</td>
                  <td className='py-2 px-4 border'>{item.name}</td>
                  <td className='py-2 px-4 border'>{item.cost || item.price}</td>
                  <td className='py-2 px-4 border'>
                    <button className='text-blue-500 hover:underline'>Edit</button>
                  </td>
                  <td className='py-2 px-4 border'>
                    <button className='text-red-500 hover:underline'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminActivities;
