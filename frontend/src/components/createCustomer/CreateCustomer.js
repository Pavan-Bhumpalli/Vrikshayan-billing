import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import QRCode from 'react-qr-code';
import bgImage from './Images/background_id.png';
import topImage from './Images/top.png';
import Logout from '../Logout';

const MySwal = withReactContent(Swal);

const CreateCustomer = () => {
    const [data, setData] = useState({
        name: '',
        phoneNumber: 0,
        peopleCount: 0,
        activities: {
            movieCount: 0,
            lunchCount: 0,
            diyCount:[],
            beverages:[],
            farmProduce:[]
        }
    });
    let token=null;
    useEffect(() => {
        token=localStorage.getItem('token');
        if(!token)
        {
            window.location.href="/loginerror";
        }

    },[]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://vrikshayan-billing-api.vercel.app/createCustomer', data);
            console.log(response.data);

            MySwal.fire({
                html: (
                    <div className='flex justify-center'>
                        <div 
                        id="printableArea" 
                        style={{ 
                            width: '50mm', 
                            height: '85mm',     
                            backgroundImage: `url(${bgImage})`, 
                            backgroundSize: 'cover', 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center', 
                            position: 'relative'
                        }}
                    >
                        <img src={topImage} alt="Top Image" style={{ position: 'absolute', top: '10mm', width: '60%' }} className='pt-3'/>
                        <div style={{ marginTop: '30mm' }} className='flex flex-col justify-center items-center'>
                            <QRCode value={String(response.data.pk)} size={100} />
                            <p className='font-bold text-lg p-3' id='name'>{data.name}</p>
                        </div>
                        </div>
                    </div>
                ),
                showCancelButton: true,
                confirmButtonText: 'Print',
                cancelButtonText: 'Close',
                preConfirm: () => {
                    const printableArea = document.getElementById('printableArea');
                    const originalContents = document.body.innerHTML;
                    document.body.innerHTML = printableArea.outerHTML;

                    const style = document.createElement('style');
                    style.media = 'print';
                    style.innerHTML = `
                      @media print {
                        body {
                          -webkit-print-color-adjust: exact !important;
                          color-adjust: exact !important;
                        }
                        #printableArea {
                          background-image: url('${bgImage}') !important;
                          background-size: cover !important;
                        }
                        #name
                        {
                            text-align: center;
                        }
                      }
                    `;
                    document.head.appendChild(style);

                    window.print();
                    document.body.innerHTML = originalContents;
                    window.location.reload(); // Reload the page to restore the original content
                }
            });
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
            <Sidebar />
            <div className='h-screen flex justify-center items-center flex-1 ml-[18%]'>
                <div className='bg-[#b2dba9] p-10 rounded-lg shadow-2xl w-full max-w-xl'>
                    <h1 className='font-bold text-2xl'>Create Customer</h1>
                    <br></br>
                    <form className='flex flex-col space-y-6' onSubmit={submitHandler}>
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
            <Logout />
        </div>
    );
};

export default CreateCustomer;
