import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, Navigate } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/users', {
        headers: {
          'x-token': token,
        }
      })
      .then(res => setData(res.data))
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(err.response?.status); 
      });
    } else {
      setError(401); 
    }
  }, []);

  if (error === 401) {
    console.log("Unauthorized");
    return <Navigate to="/login" />;
  }

  return (
    <div>
      Dashboard
      <ul>
        {data.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <li>
        <NavLink to='/login' onClick={() => localStorage.removeItem('token')}>
          Logout
        </NavLink>
      </li>
    </div>
  );
}

export default Dashboard;
