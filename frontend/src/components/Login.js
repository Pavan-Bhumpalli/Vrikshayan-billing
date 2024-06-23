import React, { useState } from 'react';
import axios from 'axios';
import image from '../images/logo.png';
import { NavLink, Navigate } from 'react-router-dom';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [redirect, setRedirect] = useState(false); 
  const [errors, setErrors] = useState({}); // State to handle errors

  const validate = () => {
    let errors = {};
    if (!data.email) {
      errors.email = "Email is required";
    }
    if (!data.password) {
      errors.password = "Password is required";
    }
    return errors;
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length !== 0) {
      setErrors(errors);
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/login', data);
      localStorage.setItem('token', response.data.token);
      alert("Login Successful");
      setRedirect(true); 
    } catch (error) {
      console.log('Error response:', error.response);
      setData({ email: '', password: '' });
      alert('Login Failed: ' + (error.response.data || 'Unknown error'));
    }
  };

  if (redirect) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 h-auto bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8" style={{ backgroundColor: "#93cf93" }}>
        <h1 className="text-3xl font-bold mb-8">Login</h1>
        <form className="w-full max-w-sm" onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
              id="email"
              type="text"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-[#308c30] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit">
              Login
            </button>
          </div>
        </form>
        <div>
          Create new Account: <NavLink to="/Register" className="text-white hover:text-blue-700 cursor-pointer text-lg font-semibold">Register</NavLink>
        </div>
      </div>
    </div>
  );
}

export default Login;
