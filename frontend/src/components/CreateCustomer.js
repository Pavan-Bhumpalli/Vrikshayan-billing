import React, { useState } from 'react';
import Nav from './Sidebar';
import axios from 'axios';
import Swal from 'sweetalert2';

const CreateCustomer = () => {
    const [data, setData] = useState({
        name: '',
        phoneNumber: 0,
        peopleCount: 0,
        activities:{
            movieCount:0,
            lunchCount:0
        }
        
    });

    const submitHandler = async (e) => {
        e.preventDefault(); // prevent default form submission
        try {
            // Post data to the server
            const response = await axios.post('http://localhost:5000/createCustomer', data);
            console.log(data); 
            Swal.fire({
                title: "Customer Created Successfully!",
                icon: "success",
                
              }).then(()=>{
                window.location.href = "/details";
              })
        } catch (error) {
            console.error('Error creating customer:', error);
            alert('Failed to create customer. Please try again later.'); // show error message
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    return (
        <div className='flex'>
            <Nav />
            <div className='h-screen flex justify-center items-center flex-1'>
                <div className='bg-blue-200 p-10 rounded-lg shadow-2xl w-full max-w-xl'>
                    <h1 className='font-bold text-2xl'>Create Customer</h1>
                    <br></br>
                    <form className='flex flex-col space-y-6 ' onSubmit={submitHandler}>
                        <div className='flex flex-col'>
                            <label className='font-semibold text-lg text-gray-700 mb-2'>Customer Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={handleInputChange}
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-semibold text-lg text-gray-700 mb-2'>Phone Number:</label>
                            <input
                                type="text"  
                                name="phoneNumber"
                                onChange={handleInputChange}
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label className='font-semibold text-lg text-gray-700 mb-2'>People Count:</label>
                            <input
                                type="number"
                                name="peopleCount"
                                onChange={handleInputChange}
                                className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                        </div>
                        <div className='flex justify-end'>
                            <button
                                type="submit"
                                className='bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'>
                                Create Customer
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCustomer;
