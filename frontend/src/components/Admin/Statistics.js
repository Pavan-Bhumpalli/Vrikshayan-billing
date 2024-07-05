import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';
import Logout from './Logout';
import { PieChart, Pie, Tooltip, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, LineChart, Line } from 'recharts';

const Statistics = () => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-11, so we add 1
  const currentYear = currentDate.getFullYear();
  const [data, setData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [selectedChart, setSelectedChart] = useState('bar'); // Default chart to display

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 7 }, (v, i) => 2024 + i);

  let token=null;
  useEffect(() => {
    const validate = () => {
        token = localStorage.getItem('token');
        if(token==null){
          window.location.href='/loginerror'
        }
    };
    validate();
  },[]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/customers/${month}/${year}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      }
    };

    fetchData();
  }, [month, year]);

  useEffect(() => {
    const daysData = () => {
      let days = Array(31).fill(0); // Initialize an array of length 31 with all elements set to 0
      data.forEach((item) => {
        if (item.createdAt && typeof item.createdAt === 'string') {
          const day = parseInt(item.createdAt.split('-')[2], 10);
          if (!isNaN(day) && day > 0 && day <= 31) {
            days[day - 1] += item.peopleCount;
          }
        }
      });

      let formattedData = days.map((value, index) => ({
        name: `${index + 1}`,
        count: value
      }));

      setFormattedData(formattedData);
    };

    daysData();
  }, [data]);

  const handleMonthChange = (event) => {
    setMonth(months.indexOf(event.target.value) + 1);
  };

  const handleYearChange = (event) => {
    setYear(parseInt(event.target.value, 10));
  };

  const handleChartChange = (chart) => {
    setSelectedChart(chart);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className='flex'>
      <AdminSidebar />
      <div className='flex w-[80%] flex-col items-center justify-center ml-[20%] '>
        <div className='flex w-[50%] my-4 flex-col items-center justify-center rounded-[20px]' style={{boxShadow : '2px 4px 6px rgba(0, 0, 0, 0.6)'}}>
          <div className='flex flex-col gap-8'>
            <h1 className='text-3xl font-bold pt-4 text-center'>Customer Count</h1>
            <div className='flex justify-around'>
              <div className="mb-4">
                <label htmlFor="month" className="block text-gray-700 text-sm font-bold mb-2">Month:</label>
                <select
                  id="month"
                  name="month"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={months[month - 1]}
                  onChange={handleMonthChange}
                >
                  {months.map((month, index) => (
                    <option key={index} value={month}>{month}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="year" className="block text-gray-700 text-sm font-bold mb-2">Year:</label>
                <select
                  id="year"
                  name="year"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  value={year}
                  onChange={handleYearChange}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className='flex gap-4 pb-4'>
              <button
                className={`px-4 py-2 rounded ${selectedChart === 'pie' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => handleChartChange('pie')}
              >
                Pie Chart
              </button>
              <button
                className={`px-4 py-2 rounded ${selectedChart === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => handleChartChange('bar')}
              >
                Bar Chart
              </button>
              <button
                className={`px-4 py-2 rounded ${selectedChart === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => handleChartChange('line')}
              >
                Line Chart
              </button>
            </div>
          </div>
          {selectedChart === 'pie' && (
            <div>
              <PieChart width={400} height={400}>
                <Pie
                  data={formattedData}
                  dataKey="count"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                >
                  {formattedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
          )}
          {selectedChart === 'bar' && (
            <div className='py-[50px]'>
              <BarChart width={400} height={300} data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </div>
          )}
          {selectedChart === 'line' && (
            <div className='py-[100px]'>
              <LineChart width={400} height={200} data={formattedData}>
                <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} dot={false} />
                <Tooltip />
              </LineChart>
            </div>
          )}
        </div>
      </div>
      <Logout />
    </div>
  );
};

export default Statistics;
