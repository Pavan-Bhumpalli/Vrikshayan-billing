import React, { useState, useEffect } from 'react';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';
import { MdAdd } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import swal from 'sweetalert2';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Logout from './Logout';
import backendUrl from '../../backendUrl.json';

const AllUsers = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  let token = null;

  useEffect(() => {
    const loadUsers = async () => {
      try {
        token=localStorage.getItem('token');
        if(!token)
        {
          window.location.href="/loginerror";
        }
        const response = await axios.get(`${backendUrl.backend_url}/users`);
        setData(response.data);
      } catch (error) {
        console.error("Error loading users:", error);
      }
    }
    loadUsers();
  }, []);

  const ShowPassword = (password) => {
    swal.fire({
      title: 'Password',
      text: password,
      icon: 'info',
      confirmButtonText: 'Close'
    });
  }

  const isValidMobileNumber = (mobile) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile);
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  

  const AddNewUser = () => {
    swal.fire({
      title: 'Add New User',
      html: `
      <form>
        <input type='text' id='name' class='swal2-input' placeholder='Username' autoFocus required>
        <input type='email' id='email' class='swal2-input' placeholder='Email' required>
        <input type='number' id='mobile' class='swal2-input' placeholder='Mobile Number' required>
        <input type='password' id='password' class='swal2-input' placeholder='Password' required>
        <input type='password' id='confirmpassword' class='swal2-input' placeholder='Confirm Password' required>
        </form>
      `,
      showCancelButton: true,
      confirmButtonText: 'Add User',
      preConfirm: async () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const mobile = document.getElementById('mobile').value;
        const confirmpassword = document.getElementById('confirmpassword').value;
        let res = null;

        if (!name || !email || !mobile || !password || !confirmpassword) {
          swal.fire({
            title: 'Error',
            text: 'All fields are required.',
            icon: 'error'
          });
          return false;
        }

        if (!isValidEmail(email)) {
          swal.fire({
            title: 'Error',
            text: 'Please enter a valid email address.',
            icon: 'error'
          });
          return false;
        }

        if (!isValidMobileNumber(mobile)) {
          swal.fire({
            title: 'Error',
            text: 'Please enter a valid 10-digit mobile number.',
            icon: 'error'
          });
          return false;
        }

        try {
          res = await axios.post('${backendUrl.backend_url}/register', {
            name,
            email,
            mobile,
            password,
            confirmpassword
          });
          if (res.data.error) {
            swal.fire({
              title: 'Error',
              position: 'top-left',
              text: res.data.error,
              icon: 'error'
            });
          } else {
            const Toast = swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
            Toast.fire({
              icon: "success",
              title: "Added successfully"
            });
          }
          window.location.reload();
        } catch (err) {
          console.log(err);
          swal.fire({
            title: 'Error',
            text: err.response ? err.response.data : 'Something went wrong',
            icon: 'error'
          });
        }
      }
    });
  }

  const editUser = async (user) => {
    swal.fire({
      title: 'Edit User',
      html: `
        <input type='text' id='edit-name' class='swal2-input' value='${user.name || ''}' placeholder='Username' autofocus>
        <input type='email' id='edit-email' class='swal2-input' value='${user.email || ''}' placeholder='Email'>
        <input type='number' id='edit-mobile' class='swal2-input' value='${user.mobile || ''}' placeholder='Mobile Number'>
        <input type='text' id='edit-password' class='swal2-input' value='${user.password || ''}' placeholder='Password'>
      `,
      showCancelButton: true,
      confirmButtonText: 'Save',
      preConfirm: async () => {
        const name = document.getElementById('edit-name').value;
        const email = document.getElementById('edit-email').value;
        const password = document.getElementById('edit-password').value;
        const mobile = document.getElementById('edit-mobile').value;

        if (!name || !email || !mobile || !password) {
          swal.fire({
            title: 'Error',
            text: 'All fields are required.',
            icon: 'error'
          });
          return false;
        }

        if (!isValidEmail(email)) {
          swal.fire({
            title: 'Error',
            text: 'Please enter a valid email address.',
            icon: 'error'
          });
          return false;
        }

        if (!isValidMobileNumber(mobile)) {
          swal.fire({
            title: 'Error',
            text: 'Please enter a valid 10-digit mobile number.',
            icon: 'error'
          });
          return false;
        }

        try {
          const res = await axios.put(`${backendUrl.backend_url}/updateUser/${user._id}`, {
            name,
            email,
            mobile,
            password
          });
          if (res.data.error) {
            swal.fire({
              title: 'Error',
              text: res.data.error,
              icon: 'error'
            });
          } else {
            swal.fire({
              title: 'Success',
              text: 'User updated successfully',
              icon: 'success'
            });
            window.location.reload();
          }
        } catch (err) {
          swal.fire({
            title: 'Error',
            text: err.response ? err.response.data : 'Something went wrong',
            icon: 'error'
          });
        }
      },
      didOpen: () => {
        // Set focus to the end of the input value for 'edit-name'
        const inputName = document.getElementById('edit-name');
        inputName.focus();
        inputName.setSelectionRange(inputName.value.length, inputName.value.length);
      }
    });
  }

  const deleteUser = async (id) => {
    const result = await swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!'
    });

    if (result.isConfirmed) {
      try {
        const res = await axios.delete(`${backendUrl.backend_url}/deleteUser/${id}`);
        if (res.data.error) {
          swal.fire({
            title: 'Error',
            text: res.data.error,
            icon: 'error'
          });
        } else {
          swal.fire({
            title: 'Deleted!',
            text: 'User has been deleted.',
            icon: 'success'
          });
          setData(data.filter(user => user._id !== id));
        }
      } catch (err) {
        swal.fire({
          title: 'Error',
          text: err.response ? err.response.data : 'Something went wrong',
          icon: 'error'
        });
      }
    }
  }

  const filteredData = data.filter(user => 
    (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())) &&
    user.name!=="admin"
  );

  return (
    <div className='flex h-screen'>
      <AdminSidebar />
      <div className='flex flex-col p-8 ml-[20%] w-[80%] mt-[2%]'>
        <div className='flex justify-end mb-4 gap-3'>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 border rounded w-72"
          />
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
              {filteredData.map((user) => (
                <tr key={user._id} className='text-center border-t'>
                  <td className='py-2 px-4 border'>{user.name}</td>
                  <td className='py-2 px-4 border'>{user.email}</td>
                  <td className='py-2 px-4 border'>
                    <center>
                      <FaEye className='cursor-pointer' onClick={() => ShowPassword(user.password)} />
                    </center>
                  </td>
                  <td className='py-2 px-4 border'>
                    <center>
                      <FaRegEdit className='hover:text-blue-500 cursor-pointer' onClick={() => editUser(user)} />
                    </center>
                  </td>
                  <td className='py-2 px-4 border'>
                    <center>
                      <MdDelete className='text-red-500 cursor-pointer' onClick={() => { deleteUser(user._id) }} size={23}/>
                    </center>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Logout />
    </div>
  )
}

export default AllUsers;
