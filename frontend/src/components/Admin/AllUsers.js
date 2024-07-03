import React from 'react'
import AdminSidebar from './AdminSidebar';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { MdAdd } from "react-icons/md";

const AllUsers = () => {
    const [data, setdata]=useState([]);
    useEffect(()=>{
        const loadUsers=async()=>{
            const response= await axios.get('http://localhost:5000/users');
            setdata(response.data);
        }
        loadUsers();
    },[])
  return (
    <div className='flex flex-col justify-between'>
        <AdminSidebar />
        <div>
            <div className='flex items-end'>
                <button>
                    <MdAdd />
                    <span>Create User</span>
                </button>
            </div>
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((user)=>{
                            return(
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button>Edit</button>
                                    </td>
                                    <td>
                                    <button>Delete</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default AllUsers
