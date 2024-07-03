import React, { useState, useEffect, useRef } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import Swal from 'sweetalert2';
import { MdOutlineDelete } from 'react-icons/md';

export default function FinalBeverages({ Customer_pk }) {
    const columns = [
        {
            name: 'Pk',
            selector: row => row.item_Pk,
        },
        {
            name: 'ItemName',
            selector: row => row.name,
        },
        {
            name: 'Quantity',
            selector: row => row.quantity,
        },
        {
            name: 'Price',
            selector: row => row.price,
        },
        {
            name: 'Total',
            selector: row => row.price * row.quantity,
        },
        {
            name: "Delete",
            cell: (row) => <button onClick={async () => {
                try {
                    Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            let val = [...data];
                            val = val.filter((item) => item.item_Pk !== row.item_Pk);
                            setData(val);
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    });
                } catch (err) {
                    console.log(err);
                }
            }}><MdOutlineDelete className='w-6 h-6 text-red-500' /></button>
        }
    ];

    const [data, setData] = useState([]);
    const [nursery, setNursery] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState(1);

    const pkRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://localhost:5000/getBeverages');
            console.log("res:", res.data);
            setNursery(res.data);
        };

        fetchData();
    }, [Customer_pk]);

    const submitHandler = e => {
        e.preventDefault();
        const item_Pk = e.target[0].value;
        const quantity = e.target[1].value;
        const total = document.getElementById('total');

        setData([...data, { item_Pk, name, quantity, price }]);

        e.target[0].value = '';
        e.target[1].value = '';
        setName('');
        setPrice('');
        setQuantity(1);
        total.innerText = '';

        pkRef.current.focus();
    };

    const addTotal = e => {
        const form = e.target.form;
        const quantity = parseInt(form[1].value);
        setQuantity(quantity);
        const total = document.getElementById('total');
        console.log("quantity:", quantity, "price:", price);
        if (!isNaN(quantity) && !isNaN(price)) {
            total.innerText = quantity * price;
        } else {
            total.innerText = 0;
        }
    };

    const show = e => {
        const pk = e.target.value;
        const item = nursery.find(item => item.beverageId == pk);
        const total = document.getElementById('total');
        if (item) {
            setName(item.name);
            setPrice(item.cost);
            total.innerText = item.cost;
        } else {
            setName('');
            setPrice('');
            total.innerText = "";
        }
    };

    const UpdateItems = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:5000/customer/beverages/${Customer_pk}`, data);
            Swal.fire({
                text: "Nursery Items Updated Successfully!",
                icon: "success"
            }).then(() => {
                window.location.reload();
            });
        } catch (err) {
            console.log(err);
        }
    };

    const calculateGrandTotal = () => {
        return data.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    };

    return (
        <div className="container md:mt-10">
            <div className="flex flex-col items-center">
                <div className="w-full">
                    <div>
                        <form className="flex items-center justify-between" onSubmit={submitHandler}>

                            <label className="font-bold">Pk</label>
                            <input
                                
                                list="beverage-list"
                                className="w-16 p-2 border rounded shadow appearance-none"
                                autoFocus
                                onChange={show}
                                ref={pkRef}
                                min={1}
                            />

                            <datalist id="beverage-list">
                                {nursery.map(item => (
                                    <option key={item.beverageId} value={item.beverageId}>{item.beverageId}-{item.name}</option>
                                ))}
                            </datalist>

                            <label className="font-bold">Item Name</label>
                            <div className="p-2 border rounded shadow appearance-none w-60 h-11" id="name">{name}</div>

                            <label className="font-bold">Quantity</label>
                            <input
                                id='quantityId'
                                type="number"
                                value={quantity}
                                className="w-16 p-2 border rounded shadow appearance-none"
                                onChange={addTotal}
                                min={0}
                            />

                            <label className="font-bold">Price</label>
                            <div className="w-16 p-2 border rounded shadow appearance-none h-11" id="price">{price}</div>

                            <label className="font-bold">Total</label>
                            <div className="p-2 border rounded shadow w-28 h-11" id="total"></div>

                            <button className="bg-[#3cbb25] text-white p-3 rounded-lg font-semibold w-16">Add</button>
                        </form>
                    </div>
                    <DataTable columns={columns} data={data} />
                    <form onSubmit={UpdateItems}>
                        <div className="flex justify-between mt-4">
                            <div className="p-3 font-semibold bg-gray-200 rounded-lg">
                                Grand Total: {calculateGrandTotal()}
                            </div>
                            <button className="bg-[#3cbb25] text-white p-3 rounded-lg font-semibold" type='submit'>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
