import React, { useState, useEffect, useRef } from 'react';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';
import { MdAdd, MdSave, MdCancel } from "react-icons/md";
import swal from 'sweetalert2';
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Logout from './Logout';
import backendUrl from '../../backendUrl.json';

const AdminActivities = ({ type, inp, del, update }) => {
    const [data, setData] = useState([]);
    const [editItemId, setEditItemId] = useState(null);
    const [editFormData, setEditFormData] = useState({});
    const nameInputRef = useRef(null);
    let token=null;
    useEffect(() => {
        token=localStorage.getItem('token');
        if(!token)
        {
          window.location.href="/loginerror";
        }

    },[]);

    const loadUsers = async () => {
        const response = await axios.get(`${backendUrl.backend_url}/${type}`);
        setData(response.data);
    };

    useEffect(() => {
        loadUsers();
    }, [type]);

    useEffect(() => {
        if (editItemId && nameInputRef.current) {
            nameInputRef.current.focus();
        }
    }, [editItemId]);

    const addNewItem = async () => {
        const { value: formValues } = await swal.fire({
            title: 'Add New Item',
            html: `
                <input type='text' id='name' class='swal2-input' placeholder='Name' required>
                <input type='number' id='cost' class='swal2-input' placeholder='Cost' required>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Add Item',
            preConfirm: () => {
                const name = document.getElementById('name').value;
                const cost = document.getElementById('cost').value;

                if (!name || !cost) {
                    swal.showValidationMessage('Please enter both name and cost');
                    return false;
                }

                return { name, cost };
            }
        });

        if (formValues) {
            try {
                const response = await axios.post(`${backendUrl.backend_url}/${inp}`, formValues);
                setData(prevData => [...prevData, response.data]);
                swal.fire('Added!', 'Your item has been added.', 'success');
            } catch (error) {
                swal.fire('Error', 'There was a problem adding your item.', 'error');
            }
        }
    };

    const deleteItem = async (item_pk) => {
        const result = await swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!'
        });
        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`${backendUrl.backend_url}/${del}/${item_pk}`);
                if (response.status === 200) {
                    swal.fire('Deleted!', 'Your item has been deleted.', 'success');
                    loadUsers();
                }
            } catch (error) {
                swal.fire('Error', 'There was a problem deleting your item.', 'error');
            }
        }
    };

    const handleEditClick = (item) => {
        setEditItemId(item._id);
        setEditFormData({ name: item.name, cost: item.cost || item.price });
    };

    const handleCancelClick = () => {
        setEditItemId(null);
        setEditFormData({});
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleSaveClick = async (item_pk) => {
        if (!editFormData.name || !editFormData.cost) {
            swal.fire('Error', 'Please enter both name and cost', 'error');
            return;
        }

        try {
            const response = await axios.put(`${backendUrl.backend_url}/${update}/${item_pk}`, editFormData);
            if (response.status === 200) {
                const updatedData = data.map(item =>
                    (item.nursery_pk || item.item_pk || item.beverageId || item.produce_pk || item.diy_pk) === item_pk ? { ...item, ...editFormData } : item
                );
                setData(updatedData);
                setEditItemId(null);
                setEditFormData({});
                swal.fire('Saved!', 'Your item has been updated.', 'success');
            }
        } catch (error) {
            swal.fire('Error', 'There was a problem saving your item.', 'error');
        }
    };

    return (
        <div className='flex h-screen'>
            <AdminSidebar />
            <div className='flex flex-col w-full p-8 ml-[20%] mt-[2%]'>
                <div className='flex justify-end mb-4'>
                    <button onClick={addNewItem} className='flex items-center font-semibold bg-[#228b22] text-white px-4 py-2 rounded hover:bg-[#165816]'>
                        <MdAdd className='inline w-6 h-6 mr-2' />
                        <span>Create</span>
                    </button>
                </div>
                <div className='overflow-x-auto'>
                    <table className='min-w-full bg-white shadow-md rounded'>
                        <thead className='bg-gray-200'>
                            <tr>
                                <th className='py-2 px-4 border'>Pk</th>
                                <th className='py-2 px-4 border'>Name</th>
                                <th className='py-2 px-4 border'>Cost</th>
                                <th className='py-2 px-4 border'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item._id} className='text-center border-t'>
                                    <td className='py-2 px-4 border'>{item.nursery_pk || item.item_pk || item.beverageId || item.produce_pk || item.diy_pk}</td>
                                    <td className='py-2 px-4 border'>
                                        {editItemId === item._id ? (
                                            <input
                                                type='text'
                                                name='name'
                                                value={editFormData.name}
                                                onChange={handleFormChange}
                                                className='border rounded p-1'
                                                ref={nameInputRef}
                                            />
                                        ) : (
                                            item.name
                                        )}
                                    </td>
                                    <td className='py-2 px-4 border'>
                                        {editItemId === item._id ? (
                                            <input
                                                type='number'
                                                name='cost'
                                                value={editFormData.cost}
                                                onChange={handleFormChange}
                                                className='border rounded p-1'
                                            />
                                        ) : (
                                            item.cost || item.price
                                        )}
                                    </td>
                                    <td className='py-2 px-4 border'>
                                        {editItemId === item._id ? (
                                            <>
                                                <button onClick={() => handleSaveClick(item.nursery_pk || item.item_pk || item.beverageId || item.produce_pk || item.diy_pk)} className='text-green-500 hover:underline'><MdSave size={25} /></button>
                                                <button onClick={handleCancelClick} className='text-red-500 hover:underline ml-2'><MdCancel size={25} /></button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => handleEditClick(item)} className='text-blue-500 hover:underline'><FaEdit size={23} /></button>
                                                <button onClick={() => deleteItem(item.nursery_pk || item.item_pk || item.beverageId || item.produce_pk || item.diy_pk)} className='text-red-500 hover:underline ml-2'><MdDeleteOutline size={25} /></button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Logout />
        </div>
    );
};

export default AdminActivities;
