import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';
import { MdAdd } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import swal from 'sweetalert2';

const AllUsers = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get('http://localhost:5000/users');
      setdata(response.data);
    }
    loadUsers();
  }, [])

  const ShowPassword = (password) => {  
    swal.fire({
      title: 'Password',
      text: password,
      icon: 'info',
      confirmButtonText: 'Close'
    });
  }

  const AddNewUser = () => {  
    swal.fire({
        title: 'Add New User',
        html: `
            <input type='text' id='name' class='swal2-input' placeholder='Username'>
            <input type='email' id='email' class='swal2-input' placeholder='Email'>
            <input type='password' id='password' class='swal2-input' placeholder='Password'>
        `,
        showCancelButton: true,
        confirmButtonText: 'Add User',
        preConfirm:async () => {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const res=await axios.post('http://localhost:5000/register', { name, email, password });
        }

    });
  }

  return (
    <div className='flex '>
      <AdminSidebar />
      <div className='flex flex-col w-full p-8'>
        <div className='flex justify-end mb-4'>
          <button onClick={AddNewUser} className='flex items-center font-semibold bg-[#228b22] text-white px-4 py-2 rounded hover:bg-[#165816]'>
            <MdAdd className='inline w-6 h-6 mr-2' />
            <span>Create User</span>
          </button>
        </div>
        <div className='overflow-x-auto'>
          <table className='min-w-full bg-white shadow-md rounded'>
            <thead className='bg-gray-200'>
              <tr>
                <th className='py-2 px-4 border'>Username</th>
                <th className='py-2 px-4 border'>Email</th>
                <th className='py-2 px-4 border'>Password</th>
                <th className='py-2 px-4 border'>Edit</th>
                <th className='py-2 px-4 border'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user._id} className='text-center border-t'>
                  <td className='py-2 px-4 border'>{user.name}</td>
                  <td className='py-2 px-4 border'>{user.email}</td>
                  <td className='py-2 px-4 border'>
                    <center>
                      <FaEye className='cursor-pointer' onClick={() => ShowPassword(user.password)} />
                    </center>
                  </td>
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
  )
}

export default AllUsers;
