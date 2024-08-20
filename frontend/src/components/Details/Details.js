import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import QrCodeGeneration from './QrCodeGeneration'; 
import bgImage from './Images/background_id.png';
import topImage from './Images/top.png'; 
import ActivityInfo from './ActivityInfo';
import Logout from '../Logout';
import backendUrl from '../../backendUrl.json';

const Details = () => {
  const [products, setProducts] = useState([]);

  let token = null;

  useEffect(() => {
    token = localStorage.getItem('token');
    if (!token) {
      window.location.href = "/loginerror";
    }
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl.backend_url}/getCustomers`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-5 flex ml-[18%] mt-[3%]">
        <div className="relative overflow-hidden shadow-md sm:rounded-lg">
          <div className="overflow-auto h-[500px]">
            <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3 sticky top-0 bg-gray-50 z-10">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 sticky top-0 bg-gray-50 z-10">
                    <div className="flex items-center">Mobile</div>
                  </th>
                  <th scope="col" className="px-6 py-3 sticky top-0 bg-gray-50 z-10">
                    <div className="flex items-center">Count</div>
                  </th>
                  <th scope="col" className="px-6 py-3 sticky top-0 bg-gray-50 z-10">
                    <div className="flex items-center">Movie</div>
                  </th>
                  <th scope="col" className="px-6 py-3 sticky top-0 bg-gray-50 z-10">
                    <div className="flex items-center">Lunch</div>
                  </th>
                  <th scope="col" className="px-6 py-3 sticky top-0 bg-gray-50 z-10">
                    <div className="flex items-center">Nursery</div>
                  </th>
                  <th scope="col" className="px-6 py-3 sticky top-0 bg-gray-50 z-10">
                    <div className="flex items-center">DIY</div>
                  </th>
                  <th scope="col" className="px-6 py-3 sticky top-0 bg-gray-50 z-10">
                    <div className="flex items-center">Beverages</div>
                  </th>
                  <th scope="col" className="px-6 py-3 sticky top-0 bg-gray-50 z-10">
                    <div className="flex items-center">Date</div>
                  </th>
                  <th scope="col" className="px-6 py-3 sticky top-0 bg-gray-50 z-10">
                    <div className="flex items-center">Qr</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-[200px] overflow-hidden">
                      {product.name}
                    </th>
                    <td className="px-6 py-4">{product.phoneNumber}</td>
                    <td className="px-6 py-4">{product.peopleCount}</td>
                    <td className="px-6 py-4">{product.activities.movieCount}</td>
                    <td className="px-6 py-4">{product.activities.lunchCount}</td>
                    <td className="px-6 py-4">
                      <ActivityInfo id={product.pk} type={"nursery"} rowData={product} />
                    </td>
                    <td className="px-6 py-4">
                      <ActivityInfo id={product.pk} type={"diy"} rowData={product} />
                    </td>
                    <td className="px-6 py-4">
                      <ActivityInfo id={product.pk} type={"beverages"} rowData={product} />
                    </td>
                    <td className="px-6 py-4">{product.createdAt.substring(0, 10)}</td>
                    <td className="px-6 py-4 cursor-pointer">
                      <QrCodeGeneration id={product.pk} name={product.name} bgImage={bgImage} topImage={topImage} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Logout />
    </div>
  );
};

export default Details;
