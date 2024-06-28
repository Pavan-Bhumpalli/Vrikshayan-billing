import React, { useState } from 'react';
import image from '../images/logo.png';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Register = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmpassword: ''
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', data);
      Swal.fire({
        title: "User Registered Successfully",
        icon: "success"
      });
      console.log(response);
      // Optionally redirect after successful registration
       window.location.href = '/login';
    } catch (error) {
      console.log('Error response:', error.response);
      Swal.fire({
        title: 'Registration Failed',
        text: error.response?.data?.message || 'Unknown error',
        icon: 'error'
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8" style={{ backgroundColor: "#93cf93" }}>
        <h1 className="text-3xl font-bold mb-2">Register</h1>
        <form className="w-full max-w-sm" onSubmit={submitHandler}>
          <div className="mb-2">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="mobile">
              Mobile
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="mobile"
              type="text"
              value={data.mobile}
              onChange={(e) => setData({ ...data, mobile: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="confirm-password"
              type="password"
              value={data.confirmpassword}
              onChange={(e) => setData({ ...data, confirmpassword: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#308c30] text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Register
            </button>
          </div>
          <div className="mt-2">
            Already Registered? <NavLink to="/login" className="text-white hover:text-blue-700 cursor-pointer text-lg font-semibold">Login</NavLink>
          </div>
        </form>
      </div>

      <div className="w-1/2 h-auto bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
      </div>
    </div>
  );
};

export default Register;
