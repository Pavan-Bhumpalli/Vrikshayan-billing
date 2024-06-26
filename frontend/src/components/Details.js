import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import QrCodeGeneration from './QrCodeGeneration'; // Assuming this is the correct path to your QrCodeGeneration component

const Details = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getCustomers');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data); // Assuming data is an array of products
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative flex  overflow-x-auto shadow-md sm:rounded-lg">
      <Sidebar />
      <div className="flex-1 ml-72 p-5 ">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Mobile
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    People Count
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Movie
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Lunch
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Date
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Qr Code
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {product.name}
                  </th>
                  <td className="px-6 py-4">{product.phoneNumber}</td>
                  <td className="px-6 py-4">{product.peopleCount}</td>
                  <td className="px-6 py-4">{product.activities.movieCount}</td>
                  <td className="px-6 py-4">{product.activities.lunchCount}</td>
                  <td className="px-6 py-4">{product.updatedAt.substring(0, 10)}</td>
                  <td className="px-6 py-4">
                    <QrCodeGeneration id={product._id} name={product.name}/>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                      Edit
                    </a>
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

export default Details;
