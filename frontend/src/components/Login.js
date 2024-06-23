import React from 'react'
import image from '../images/logo.png';
import {NavLink} from 'react-router-dom';

const Login = () => {
    return (
        <div className="min-h-screen flex">
          <div className="w-1/2 h-auto bg-cover bg-center" style={{ backgroundImage: `url(${image})` }}>
          </div>
          
          <div className="w-1/2 flex flex-col justify-center items-center bg-white p-8" style={{backgroundColor:"#93cf93"}}>
            <h1 className="text-3xl font-bold mb-8">Login</h1>
            <form className="w-full max-w-sm">
              <div className="mb-4">
                <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                  id="username" 
                  type="text" 
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                  id="password" 
                  type="password" 
                />
              </div>
              <div className="flex items-center justify-between">
                <button 
                  className="bg-[#308c30] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                  type="button">
                  Login
                </button>
              </div>
            </form>
            <div >
            Create new Account: <NavLink to="/Register" className="text-white hover:text-blue-700 cursor-pointer text-lg font-semibold">Register</NavLink>
          </div>
          </div>
          
        </div>
      );
}

export default Login